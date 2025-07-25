import { useEffect, useRef, useCallback } from 'react';

interface UseCanvasProps {
  canvasWidth: number;
  canvasHeight: number; // Wysokość teraz jest już przekazywana w px
  numBars: number;
  barSpacing: number;
}

interface CanvasState {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  drawStaticBars: () => void;
}

export const useCanvas = ({ canvasWidth, canvasHeight, numBars, barSpacing }: UseCanvasProps): CanvasState => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Statyczne paski - memoizowana funkcja
  const drawStaticBars = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      console.warn('useCanvas: Missing canvas or context for static bars.');
      return;
    }

    const barWidth = Math.floor((canvas.width - (numBars - 1) * barSpacing) / numBars);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';

    // Używamy stałych wartości zamiast Math.random(), aby uniknąć różnic w hydratacji
    // Wysokości są stosunkowo niskie, aby służyć jako "spoczynkowe" paski
    const heights = Array(numBars).fill(0).map((_, i) => (i % 2 === 0 ? 6 : 4)); // Stałe wysokości dla spójności

    for (let i = 0; i < numBars; i++) {
      const x = i * (barWidth + barSpacing);
      const height = heights[i];
      const y = canvas.height - height;

      ctx.beginPath();
      const radius = 2; // Zaokrąglenie górnych rogów
      const topRadius = radius;
      const bottomRadius = 0; // Brak zaokrąglenia dolnych rogów

      ctx.moveTo(x + topRadius, y);
      ctx.lineTo(x + barWidth - topRadius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + topRadius);
      ctx.lineTo(x + barWidth, y + height - bottomRadius);
      ctx.lineTo(x + barWidth, y + height); // Dolny prawy róg
      ctx.lineTo(x, y + height); // Dolny lewy róg
      ctx.lineTo(x, y + height - bottomRadius);
      ctx.lineTo(x, y + topRadius);
      ctx.quadraticCurveTo(x, y, x + topRadius, y);
      ctx.closePath();
      ctx.fill();
    }
    // console.log('useCanvas: Static bars drawn.');
  }, [canvasWidth, canvasHeight, numBars, barSpacing]); // Zależności dla useCallback

  // Inicjalizacja Canvas (raz, gdy zmieniają się wymiary)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('useCanvas: No canvas element found.');
      return;
    }

    // console.log('useCanvas: Initializing canvas dimensions.', { canvasWidth, canvasHeight });
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawStaticBars(); // Narysuj statyczne paski po zmianie wymiarów
  }, [canvasWidth, canvasHeight, drawStaticBars]); // Zależności: wymiary i funkcja rysująca

  return { canvasRef, drawStaticBars };
};