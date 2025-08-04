'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from '@lib/utils';

interface LoaderProps {
  fullscreen?: boolean;
  size?: string;
  colorClass?: string;
  className?: string;
  message?: string;
  srMessage?: string;
  heightPx?: number;
}

export const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 'text-4xl',
  colorClass = 'text-foreground',
  className = '',
  message,
  srMessage = 'Ładowanie danych, proszę czekać...',
  heightPx,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center', // ✅ zawsze centrowanie
        fullscreen
          ? 'fixed inset-0 z-50 bg-background' // fullscreen overlay
          : 'w-full', // normalny tryb w obrębie kontenera
        heightPx ? `h-[${heightPx}px]` : fullscreen ? 'h-screen' : 'h-full',
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
