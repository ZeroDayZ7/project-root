'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAudio } from './useAudio';
import { useCanvas } from './useCanvas';
import { useEqualizer } from './useEqualizer';
import { Loader } from '../ui/Loader';

interface AudioPlayerProps {
  audioSrc: string;
  className?: string;
  playerHeightPx?: number;
  canvasHeightPx?: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  className = '',
  playerHeightPx = 150,
  canvasHeightPx = 40,
}) => {
  const canvasWidth = 300;
  const numBars = 24;
  const barSpacing = 2;

  const {
    isPlaying,
    volume,
    setVolume,
    isInitialized,
    togglePlay,
    analyser,
    error,
  } = useAudio({
    audioSrc,
    initialVolume: 20,
  });

  const { canvasRef } = useCanvas({
    canvasWidth,
    canvasHeight: canvasHeightPx,
    numBars,
    barSpacing,
  });

  const { animateEqualizer } = useEqualizer({
    canvasRef,
    analyser,
    isPlaying,
    canvasWidth,
    canvasHeight: canvasHeightPx,
    numBars,
    barSpacing,
  });

  useEffect(() => {
    if (isPlaying && analyser) {
      animateEqualizer();
    }
  }, [isPlaying, analyser, animateEqualizer]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
  };

const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  togglePlay();
};

  if (!isInitialized) {
    return (
      <Loader
        heightPx={playerHeightPx}
        colorClass="text-audio-400"
        message="Ładowanie odtwarzacza..."
        srMessage="Ładowanie odtwarzacza audio, proszę czekać..."
      />
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          'bg-audio-400/10 border border-audio-400/30 rounded-lg p-3 flex items-center justify-center',
          className,
        )}
        style={{ height: `${playerHeightPx}px` }}
      >
        <div role="alert" className="text-red-500 text-sm">
          {error}
          <button onClick={togglePlay} className="ml-4 text-blue-500 underline">
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-audio-400/10 border border-audio-400/30 rounded-lg p-3',
        className,
      )}
      style={{ height: `${playerHeightPx}px` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            type="button" // Wyraźnie ustaw type="button"
            onClick={handlePlayClick}
            disabled={!isInitialized}
            className={cn(
              'flex items-center space-x-2 px-3 py-1',
              'bg-audio-500/20 hover:bg-audio-500/30',
              'border border-audio-400/50 hover:border-audio-400/70',
              'rounded text-sm font-medium text-audio-400',
              'duration-300',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'group relative overflow-hidden',
              'focus-visible:bg-audio-500/30 focus-visible:ring-2 focus-visible:ring-audio-400 focus-visible:ring-offset-2 focus-visible:outline-none',
            )}
          >
            <span className="relative text-audio-400 text-sm">🎵</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-audio-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 w-24">
              {isPlaying ? 'ZATRZYMAJ' : 'ODTWÓRZ'}
            </span>
            <div
              className={cn(
                'w-2 h-2 bg-audio-400 rounded-full relative z-10',
                isPlaying && 'animate-pulse',
              )}
            />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-audio-400/70">VOL:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className={cn(
                'w-16 h-1 bg-audio-400/20 rounded-lg appearance-none cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3',
                '[&::-webkit-slider-thumb]:bg-audio-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer',
                '[&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-audio-400',
                '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer',
              )}
            />
            <span className="text-xs text-audio-400/70 w-8">{volume}%</span>
          </div>
        </div>
      </div>
      <div className="bg-background/40 border border-audio-400/20 rounded p-2">
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ imageRendering: 'pixelated', height: `${canvasHeightPx}px` }}
        />
      </div>
      <div className="mt-2 text-xs text-audio-400 text-center">
        KASANDRA AUDIO SYSTEM • {isPlaying ? 'STREAMING' : 'STANDBY'}
      </div>
    </div>
  );
};
