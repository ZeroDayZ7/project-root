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

const nearestPowerOfTwo = (value: number): number => {
  if (value < 32) return 32;
  if (value > 32768) return 32768;
  return Math.pow(2, Math.round(Math.log2(value)));
};

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
  const dataArray = useRef<Uint8Array | null>(null);

  const targetFps = isPlaying ? 30 : 10; // Dynamiczne FPS
  const frameInterval = 1000 / targetFps;

  const animateEqualizer = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || !analyser) {
      console.warn('useEqualizer: Brak canvas, kontekstu lub analizatora.');
      return;
    }

    if (!dataArray.current) {
      dataArray.current = new Uint8Array(analyser.frequencyBinCount);
    }
    const bufferLength = analyser.frequencyBinCount;
    const totalSpacing = (numBars - 1) * barSpacing;
    const barWidth = (canvas.width - totalSpacing) / numBars;

    // Tworzenie gradientu raz
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#a855f7');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;

    // Cache'owanie indeksów częstotliwości
    // --------------------------------------------------------------------
    // kwadratowy rozkład
    // --------------------------------------------------------------------
    // const freqIndices = new Array(numBars)
    //   .fill(0)
    //   .map((_, i) => Math.floor(Math.pow(i / numBars, 2) * bufferLength));
    // --------------------------------------------------------------------
    // liniowy rozkład:
    // --------------------------------------------------------------------
    // const freqIndices = new Array(numBars)
    //   .fill(0)
    //   .map((_, i) => Math.floor((i / numBars) * bufferLength));
    // --------------------------------------------------------------------
    // logarytmiczny rozkład:
    // --------------------------------------------------------------------
    const freqIndices = new Array(numBars).fill(0).map((_, i) => {
      const minFreq = 0;
      const maxFreq = bufferLength / 2; // Połowę, bo wyższe częstotliwości są lustrzane
      const fraction = i / numBars;
      const logIndex = Math.floor(
        minFreq +
          (Math.log1p(fraction * 9) / Math.log1p(9)) * (maxFreq - minFreq),
      );
      return Math.min(bufferLength - 1, logIndex);
    });

    const renderFrame = (currentTime: DOMHighResTimeStamp) => {
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      const deltaTime = (currentTime - lastFrameTime.current) / 1000; // Czas w sekundach
      lastFrameTime.current = currentTime;

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray.current!);
        previousDataRef.current = Array.from(dataArray.current!);
      } else {
        const decayPerSecond = 150; // Szybkość opadania w jednostkach na sekundę
        let maxValue = 0;
        for (let i = 0; i < bufferLength; i++) {
          const currentValue = previousDataRef.current[i] ?? 0;
          previousDataRef.current[i] = Math.max(
            0,
            currentValue - decayPerSecond * deltaTime,
          );
          dataArray.current![i] = previousDataRef.current[i];
          maxValue = Math.max(maxValue, dataArray.current![i]);
        }
        if (maxValue <= 0) {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = undefined;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          return;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < numBars; i++) {
        const freqIndex = freqIndices[i];
        const dataValue = dataArray.current![freqIndex] || 0;
        const scaledValue = Math.pow(dataValue / 255, 0.9) * 255;
        const height = Math.max(2, (scaledValue / 255) * canvas.height);

        const x = i * (barWidth + barSpacing);
        const y = canvas.height - height;

        ctx.fillRect(x, y, barWidth, height); // Prostsze rysowanie
        // Jeśli chcesz zaokrąglone prostokąty, odkomentuj poniższy kod:
        /*
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
        */
      }

      animationFrameId.current = requestAnimationFrame(renderFrame);
    };

    lastFrameTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(renderFrame);
  }, [
    analyser,
    isPlaying,
    canvasRef,
    numBars,
    barSpacing,
    canvasWidth,
    canvasHeight,
  ]);

  useEffect(() => {
    if (analyser) {
      analyser.fftSize = nearestPowerOfTwo(numBars * 8);
      analyser.smoothingTimeConstant = 0.8; // Płynniejsze przejścia
    }
    if (isPlaying && analyser) {
      previousDataRef.current = new Array(analyser.frequencyBinCount).fill(0);
      dataArray.current = new Uint8Array(analyser.frequencyBinCount);
    }
  }, [isPlaying, analyser, numBars]);

  
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { animateEqualizer };
};
