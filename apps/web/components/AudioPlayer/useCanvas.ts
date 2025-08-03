'use client';

import { useEffect, useRef } from 'react';

interface UseCanvasProps {
  canvasWidth: number;
  canvasHeight: number;
  numBars: number;
  barSpacing: number;
}

interface CanvasState {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export const useCanvas = ({
  canvasWidth,
  canvasHeight,
}: UseCanvasProps): CanvasState => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('useCanvas: Brak elementu canvas.');
      return;
    }

    // Ustaw wymiary tylko, jeśli się zmieniły
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }, [canvasWidth, canvasHeight]);

  return { canvasRef };
};
