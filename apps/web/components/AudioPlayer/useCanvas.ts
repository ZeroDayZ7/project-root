// components/useCanvas.ts
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

export const useCanvas = ({ canvasWidth, canvasHeight }: UseCanvasProps): CanvasState => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Inicjalizacja Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('useCanvas: Brak elementu canvas.');
      return;
    }

    console.log('useCanvas: Inicjalizacja wymiarów canvas.', { canvasWidth, canvasHeight });
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }, [canvasWidth, canvasHeight]);

  return { canvasRef };
};