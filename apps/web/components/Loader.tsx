'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  fullscreen?: boolean; // Overlay na cały ekran
  size?: string; // np. "text-4xl"
  colorClass?: string; // np. "text-audio-400"
  className?: string; // Dodatkowe klasy Tailwind
  message?: string; // Widoczny tekst pod loaderem
  srMessage?: string; // Tekst tylko dla czytników ekranu
  heightPx?: number; // Wysokość w pikselach, dopasowana do AudioPlayer
}

export const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 'text-4xl',
  colorClass = 'text-accent-foreground',
  className = '',
  message,
  srMessage = 'Ładowanie danych, proszę czekać...',
  heightPx,
}) => {
  return (
    <div
      className={cn(
        fullscreen
          ? 'fixed inset-0 z-50 bg-foreground'
          : 'flex flex-col items-center justify-center w-full',
        heightPx && `h-[${heightPx}px]`,
        'border border-foreground/30 rounded-lg p-3',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className={cn('animate-spin', colorClass, size)}
        aria-hidden="true"
      />
      {message && <p className={cn('mt-3 text-sm', colorClass)}>{message}</p>}
      <span className="sr-only">{srMessage}</span>
    </div>
  );
};
