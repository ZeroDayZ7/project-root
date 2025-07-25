import { useEffect, useRef, useCallback } from 'react';

interface UseEqualizerProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  canvasWidth: number;
  canvasHeight: number;
  numBars: number;
  barSpacing: number;
  drawStaticBars: () => void;
  visualizerGain: number; // Nowa prop: czułość wizualizera
}

interface EqualizerState {
  animateEqualizer: () => void;
}

export const useEqualizer = ({
  canvasRef,
  analyser,
  isPlaying,
  canvasWidth,
  canvasHeight,
  numBars,
  barSpacing,
  drawStaticBars,
  visualizerGain, // Używamy tej prop do skalowania wysokości pasków
}: UseEqualizerProps): EqualizerState => {
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<DOMHighResTimeStamp>(0);

  // Optymalizacja: Regulacja FPS
  const targetFps = 60; // Docelowa liczba klatek na sekundę
  const frameInterval = 100 / targetFps; // Interwał w milisekundach

  // Animacja Equalizera - memoizowana funkcja
  const animateEqualizer = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || !analyser) {
      console.warn('useEqualizer: Missing canvas, context, or analyser for animation.');
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = Math.floor((canvas.width - (numBars - 1) * barSpacing) / numBars);

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#a855f7');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#7c3aed');

    const renderFrame = (currentTime: DOMHighResTimeStamp) => {
      // Optymalizacja FPS: Sprawdź, czy minął wystarczający czas od ostatniej klatki
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      lastFrameTime.current = currentTime; // Zaktualizuj czas ostatniej klatki

      if (!isPlaying) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined; // Resetuj ID
        }
        drawStaticBars(); // Rysuj statyczne paski, gdy odtwarzanie jest zatrzymane
        // console.log('useEqualizer: Animation stopped, drawing static bars.');
        return;
      }

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;

      for (let i = 0; i < numBars; i++) {
        // Mapowanie indeksów częstotliwości do pasków wizualizera
        // Użyj logarytmicznego skalowania dla lepszej wizualizacji niskich częstotliwości
        const freqIndex = Math.floor(i * (bufferLength / numBars));
        const dataValue = dataArray[freqIndex] || 0;

        // Normalizacja i skalowanie wysokości pasków
        // Skalowanie przez visualizerGain - to jest klucz do kontroli czułości
        const scaledValue = dataValue * (visualizerGain / 100); // Skalujemy od 0 do 255
        const height = Math.max(2, (scaledValue / 255) * canvas.height); // Minimalna wysokość paska

        const x = i * (barWidth + barSpacing);
        const y = canvas.height - height;

        // Rysowanie zaokrąglonych pasków
        ctx.beginPath();
        const radius = 2;
        const topRadius = radius;
        const bottomRadius = 0; // Dół pasków jest płaski

        ctx.moveTo(x + topRadius, y);
        ctx.lineTo(x + barWidth - topRadius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + topRadius);
        ctx.lineTo(x + barWidth, y + height - bottomRadius);
        ctx.lineTo(x + barWidth, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + height - bottomRadius);
        ctx.lineTo(x, y + topRadius);
        ctx.quadraticCurveTo(x, y, x + topRadius, y);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(renderFrame);
    };

    // console.log('useEqualizer: Starting animation frame loop.');
    animationFrameId.current = requestAnimationFrame(renderFrame);
  }, [analyser, isPlaying, canvasWidth, canvasHeight, numBars, barSpacing, drawStaticBars, visualizerGain, frameInterval]); // Zależności dla useCallback

  // Cleanup effect: Anuluj animację przy odmontowaniu lub zmianie isPlaying
  useEffect(() => {
    if (!isPlaying && animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = undefined;
    }
    // Rysuj statyczne paski, gdy odtwarzanie jest zatrzymane lub komponent się montuje
    if (!isPlaying) {
      drawStaticBars();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, drawStaticBars]); // Tylko isPlaying i drawStaticBars jako zależności

  return { animateEqualizer };
};