// components/useEqualizer.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseEqualizerProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  analyser: AnalyserNode | null;
  isPlaying: boolean;
  canvasWidth: number;
  canvasHeight: number;
  numBars: number;
  barSpacing: number;
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
}: UseEqualizerProps): EqualizerState => {
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<DOMHighResTimeStamp>(0);
  const previousDataRef = useRef<number[]>([]);

  const targetFps = 30; // Docelowa liczba klatek na sekundę
  const frameInterval = 200 / targetFps; // Interwał w milisekundach
  const decay = 10; // Szybkość opadania pasków

  const animateEqualizer = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || !analyser) {
      console.warn('useEqualizer: Brak canvas, kontekstu lub analizatora dla animacji.');
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    // Dynamiczne obliczanie szerokości paska, aby wypełnić całą szerokość
    const totalSpacing = (numBars - 1) * barSpacing;
    const barWidth = (canvas.width - totalSpacing) / numBars; // Usunięto Math.floor

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#a855f7');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#7c3aed');

    const renderFrame = (currentTime: DOMHighResTimeStamp) => {
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      lastFrameTime.current = currentTime;

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray);
        previousDataRef.current = Array.from(dataArray);
      } else {
        for (let i = 0; i < bufferLength; i++) {
          const currentValue = previousDataRef.current[i] ?? 0;
          previousDataRef.current[i] = Math.max(0, currentValue - decay);
          dataArray[i] = previousDataRef.current[i];
        }
      }

      const allZero = dataArray.every((v) => v <= 0);
      if (!isPlaying && allZero) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined;
          console.log('useEqualizer: Animacja zatrzymana, wszystkie paski na dole.');
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;

      for (let i = 0; i < numBars; i++) {
        const freqIndex = Math.floor(Math.pow(i / numBars, 2) * bufferLength);
        const dataValue = dataArray[freqIndex] || 0;
        const scaledValue = Math.pow(dataValue / 255, 0.9) * 255;
        const height = Math.max(2, (scaledValue / 255) * canvas.height);

        const x = i * (barWidth + barSpacing);
        const y = canvas.height - height;

        ctx.beginPath();
        const radius = 2;
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(renderFrame);
    };

    console.log('useEqualizer: Rozpoczynanie pętli animacji.');
    lastFrameTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(renderFrame);
  }, [analyser, isPlaying, canvasRef, numBars, barSpacing, canvasWidth, canvasHeight]);

  useEffect(() => {
    if (isPlaying) {
      previousDataRef.current = new Array(analyser?.frequencyBinCount || 64).fill(0);
      console.log('useEqualizer: Reset previousDataRef przy wznowieniu odtwarzania.');
    }
  }, [isPlaying, analyser]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        console.log('useEqualizer: Czyszczenie animacji.');
      }
    };
  }, []);

  return { animateEqualizer };
};