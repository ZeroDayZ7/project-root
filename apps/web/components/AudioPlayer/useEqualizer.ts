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
}: UseEqualizerProps): EqualizerState => {
  const animationFrameId = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef<DOMHighResTimeStamp>(0);
  const previousDataRef = useRef<number[]>([]);

  const targetFps = 30;
  const frameInterval = 200 / targetFps;

  const animateEqualizer = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx || !analyser) {
      console.warn('useEqualizer: Missing canvas, context, or analyser for animation.');
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const barWidth = Math.floor((canvas.width - (numBars - 1) * barSpacing) / numBars);

    const renderFrame = (currentTime: DOMHighResTimeStamp) => {
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationFrameId.current = requestAnimationFrame(renderFrame);
        return;
      }
      lastFrameTime.current = currentTime;

      const dataArray = new Uint8Array(bufferLength);

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray);
        previousDataRef.current = Array.from(dataArray);

        // const decay = 20; // im wyższe, tym szybciej opadają (np. 10–20)

       

        // for (let i = 0; i < bufferLength; i++) {
        //   const current = dataArray[i];
        //   const previous = previousDataRef.current[i] ?? 0;

        //   // Jeśli nowa wartość jest wyższa – aktualizuj od razu
        //   if (current > previous) {
        //     previousDataRef.current[i] = current;
        //   } else {
        //     // Jeśli niższa – stopniowo zmniejsz
        //     previousDataRef.current[i] = Math.max(0, previous - decay);
        //   }

        //   // Aktualizuj dataArray tym, co narysujesz
        //   dataArray[i] = previousDataRef.current[i];
        // }
      } else {
        const current = previousDataRef.current;
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.max(0, (current?.[i] ?? 0) - 4);
        }
        previousDataRef.current = Array.from(dataArray);
      }

      const allZero = dataArray.every((v) => v <= 0);
      if (!isPlaying && allZero) {
        cancelAnimationFrame(animationFrameId.current!);
        animationFrameId.current = undefined;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(0.5, '#8b5cf6');
      gradient.addColorStop(1, '#7c3aed');
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

    animationFrameId.current = requestAnimationFrame(renderFrame);
  }, [analyser, isPlaying, canvasRef, numBars, barSpacing, canvasWidth, canvasHeight, frameInterval]);

  useEffect(() => {
    if (!isPlaying && animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = undefined;
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying]);

  return { animateEqualizer };
};
