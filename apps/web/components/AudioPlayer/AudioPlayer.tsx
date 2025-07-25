'use client';

import { useEffect, useState } from 'react';
import { useAudio } from './useAudio';
import { useCanvas } from './useCanvas';
import { useEqualizer } from './useEqualizer';
import { Loader } from '../Loader'; // Upewnij się, że ścieżka do Loadera jest poprawna

interface AudioPlayerProps {
  audioSrc: string;
  className?: string;
  playerHeightPx?: number; // Nowa prop: stała wysokość odtwarzacza w px
  canvasHeightPx?: number; // Nowa prop: stała wysokość canvas w px
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  className = '',
  playerHeightPx = 150, // Domyślna wysokość odtwarzacza
  canvasHeightPx = 40, // Domyślna wysokość canvas
}) => {
  const canvasWidth = 300; // Szerokość canvas może być stała lub konfigurowalna
  const numBars = 24;
  const barSpacing = 2;

  const { isPlaying, volume, setVolume, isInitialized, togglePlay, analyser } = useAudio({
    audioSrc,
    initialVolume: 20,
  });

  // Użyj AnalyserNode i AudioContext jako zależności dla useEqualizer
  const { canvasRef, drawStaticBars } = useCanvas({
    canvasWidth,
    canvasHeight: canvasHeightPx, // Przekazujemy stałą wysokość canvas
    numBars,
    barSpacing,
  });

  const { animateEqualizer } = useEqualizer({
    canvasRef,
    analyser,
    isPlaying,
    canvasWidth,
    canvasHeight: canvasHeightPx, // Przekazujemy stałą wysokość canvas
    numBars,
    barSpacing,
    drawStaticBars,
  });

  // Uruchom animację, gdy odtwarzanie się zaczyna
  useEffect(() => {
    if (isPlaying && analyser) {
      //   console.log('AudioPlayer: Starting equalizer animation.');
      animateEqualizer();
    }
  }, [isPlaying, analyser, animateEqualizer]);

  // Zmiana głośności
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    // console.log('AudioPlayer: Changing volume:', newVolume);
    setVolume(newVolume);
  };

  if (!isInitialized) {
    return <Loader className={className} />;
  }

  return (
    <div
      className={`bg-purple-400/10 border border-purple-400/30 rounded-lg p-3 ${className}`}
      style={{ height: `${playerHeightPx}px` }} // Ustawienie stałej wysokości odtwarzacza
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            disabled={!isInitialized}
            className="
    flex items-center space-x-2 px-3 py-1
    bg-purple-500/20 hover:bg-purple-500/30
    border border-purple-400/50 hover:border-purple-400/70
    rounded text-sm font-medium text-purple-300
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    group relative overflow-hidden
  "
          >
            <span className="relative text-purple-400 text-sm">🎵</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 w-24">{isPlaying ? 'ZATRZYMAJ' : 'ODTWÓRZ'}</span>

            <div className={`w-2 h-2 bg-purple-400 rounded-full relative z-10 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {' '}
          {/* Zwiększony odstęp */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-purple-400/70">VOL:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="
                w-16 h-1 bg-purple-400/20 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:bg-purple-400
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer
              "
            />
            <span className="text-xs text-purple-400/70 w-8">{volume}%</span>
          </div>
        </div>
      </div>
      <div className="bg-black/40 border border-purple-400/20 rounded p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block" // h-auto tutaj jest ok, bo canvas ma sztywną wysokość w JS
          style={{ imageRendering: 'pixelated', height: `${canvasHeightPx}px` }} // Ustawienie stałej wysokości canvas w CSS
        />
      </div>
      <div className="mt-2 text-xs text-purple-400 text-center">
        KASANDRA AUDIO SYSTEM • {isPlaying ? 'STREAMING' : 'STANDBY'}
      </div>
    </div>
  );
};
