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
  // Poprawka: Inicjalizacja bez ArgumentBuffer - let TypeScript sam wywnioskować typ
  // const dataArray = useRef<Uint8Array | null>(null);
  const dataArray = useRef<Uint8Array<ArrayBuffer> | null>(null);
  // Cache dla indeksów częstotliwości - optymalizacja
  const freqIndicesRef = useRef<number[]>([]);
  const gradientRef = useRef<CanvasGradient | null>(null);

  const targetFps = isPlaying ? 60 : 10; // Zwiększone FPS dla płynniejszej animacji
  const frameInterval = 1000 / targetFps;

  // Memoizacja gradientu - optymalizacja
  const createGradient = useCallback((ctx: CanvasRenderingContext2D, height: number) => {
    if (!gradientRef.current) {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(0.5, '#8b5cf6');
      gradient.addColorStop(1, '#7c3aed');
      gradientRef.current = gradient;
    }
    return gradientRef.current;
  }, []);

  const animateEqualizer = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || !analyser || !dataArray.current) {
      console.warn('useEqualizer: Brak wymaganych elementów.');
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const totalSpacing = (numBars - 1) * barSpacing;
    const barWidth = (canvas.width - totalSpacing) / numBars;

    // Użyj cache'owanego gradientu
    ctx.fillStyle = createGradient(ctx, canvas.height);

    const renderFrame = (currentTime: DOMHighResTimeStamp) => {
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      const deltaTime = (currentTime - lastFrameTime.current) / 1000;
      lastFrameTime.current = currentTime;

      if (isPlaying && dataArray.current) {
        // Poprawka: Bezpośrednie użycie dataArray.current bez dodatkowych przypisań
        analyser.getByteFrequencyData(dataArray.current);
        // Kopiuj dane do previousData tylko gdy potrzeba
        if (previousDataRef.current.length !== bufferLength) {
          previousDataRef.current = new Array(bufferLength);
        }
        for (let i = 0; i < bufferLength; i++) {
          previousDataRef.current[i] = dataArray.current[i];
        }
      } else {
        // Animacja zaniku gdy nie gra
        const decayPerSecond = 200;
        let maxValue = 0;
        
        if (previousDataRef.current.length > 0 && dataArray.current) {
          for (let i = 0; i < bufferLength; i++) {
            const currentValue = previousDataRef.current[i] ?? 0;
            previousDataRef.current[i] = Math.max(
              0,
              currentValue - decayPerSecond * deltaTime,
            );
            dataArray.current[i] = previousDataRef.current[i];
            maxValue = Math.max(maxValue, dataArray.current[i]);
          }
        }

        if (maxValue <= 1) {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = undefined;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          return;
        }
      }

      // Optymalizacja: używaj willReadFrequently dla lepszej wydajności
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < numBars; i++) {
        const freqIndex = freqIndicesRef.current[i];
        const dataValue = dataArray.current![freqIndex] || 0;
        // Lepsza krzywa skalowania dla bardziej naturalne wyglądu
        const scaledValue = Math.pow(dataValue / 255, 0.7) * 255;
        const height = Math.max(1, (scaledValue / 255) * canvas.height);

        const x = i * (barWidth + barSpacing);
        const y = canvas.height - height;

        // Proste prostokąty dla lepszej wydajności
        ctx.fillRect(x, y, barWidth, height);
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
    createGradient,
  ]);

  // Inicjalizacja i konfiguracja analizera
  useEffect(() => {
    if (analyser) {
      const fftSize = nearestPowerOfTwo(numBars * 8);
      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = 0.85; // Nieco więcej wygładzania
      
      // Poprawka: Prawidłowa inicjalizacja Uint8Array
      const bufferLength = analyser.frequencyBinCount;
      dataArray.current = new Uint8Array(bufferLength);
      previousDataRef.current = new Array(bufferLength).fill(0);

      // Cache indeksów częstotliwości - oblicz raz
      freqIndicesRef.current = new Array(numBars).fill(0).map((_, i) => {
        const minFreq = 0;
        const maxFreq = bufferLength / 2;
        const fraction = i / numBars;
        const logIndex = Math.floor(
          minFreq +
            (Math.log1p(fraction * 9) / Math.log1p(9)) * (maxFreq - minFreq),
        );
        return Math.min(bufferLength - 1, logIndex);
      });

      // Reset gradientu gdy zmienia się konfiguracja
      gradientRef.current = null;
    }
  }, [analyser, numBars]);

  // Reset gdy zmienia się stan odtwarzania
  useEffect(() => {
    if (isPlaying && analyser && dataArray.current) {
      const bufferLength = analyser.frequencyBinCount;
      previousDataRef.current = new Array(bufferLength).fill(0);
    }
  }, [isPlaying, analyser]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
    };
  }, []);

  return { animateEqualizer };
};