'use client';

import { useState, useEffect, useRef } from 'react';

interface UseAudioProps {
  audioSrc: string;
  initialVolume: number;
}

interface AudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  sourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  isInitialized: boolean;
  isPlaying: boolean;
  volume: number;
  setIsPlaying: (value: boolean) => void;
  setVolume: (value: number) => void;
  togglePlay: () => Promise<void>;
  initializeAudioContext: () => void;
}

export const useAudio = ({ audioSrc, initialVolume }: UseAudioProps): AudioState => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Inicjalizacja audio
  useEffect(() => {
    console.log('useAudio: Inicjalizacja audio', { audioSrc });
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;
    audioRef.current.crossOrigin = 'anonymous';
    audioRef.current.volume = volume / 100;

    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('useAudio: Audio gotowe do odtwarzania');
      setIsInitialized(true);
    });

    audioRef.current.addEventListener('ended', () => {
      console.log('useAudio: Audio zakończone');
      setIsPlaying(false);
    });

    audioRef.current.addEventListener('error', (e) => {
      console.error('useAudio: Błąd audio:', e);
      setIsPlaying(false);
    });

    return () => {
      console.log('useAudio: Czyszczenie audio');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContext) {
        audioContext.close().catch((error) => console.warn('useAudio: Błąd zamykania AudioContext:', error));
      }
    };
  }, [audioSrc]);

  // Aktualizacja głośności
  useEffect(() => {
    if (audioRef.current) {
      console.log('useAudio: Aktualizacja głośności:', volume);
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Inicjalizacja Web Audio API
  const initializeAudioContext = () => {
    if (!audioRef.current || audioContext) {
      console.log('useAudio: AudioContext już zainicjalizowany lub brak audioRef');
      return;
    }

    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      console.warn('useAudio: Web Audio API nie jest wspierane w tej przeglądarce');
      return;
    }

    try {
      console.log('useAudio: Inicjalizacja AudioContext');
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = ctx.createAnalyser();
      
      analyserNode.fftSize = 128;
      analyserNode.smoothingTimeConstant = 0.8;
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);
      
      setAudioContext(ctx);
      setAnalyser(analyserNode);
      sourceRef.current = source;
      console.log('useAudio: AudioContext i AnalyserNode zainicjalizowane');
    } catch (error) {
      console.warn('useAudio: Błąd inicjalizacji Web Audio API:', error);
    }
  };

  // Przełączanie play/pause
  const togglePlay = async () => {
    if (!audioRef.current || !isInitialized) {
      console.warn('useAudio: Audio nie zainicjalizowane lub brak audioRef:', { audioRef: audioRef.current, isInitialized });
      return;
    }

    try {
      if (isPlaying) {
        console.log('useAudio: Pauzowanie audio');
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('useAudio: Rozpoczynanie odtwarzania');
        if (!audioContext) {
          initializeAudioContext();
        }
        
        if (!analyser) {
          console.log('useAudio: Oczekiwanie na AnalyserNode');
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (audioContext && audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('useAudio: AudioContext wznowiony, stan:', audioContext.state);
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('useAudio: Odtwarzanie rozpoczęte');
      }
    } catch (error) {
      console.error('useAudio: Błąd odtwarzania:', error);
    }
  };

  return {
    audioRef,
    audioContext,
    analyser,
    sourceRef,
    isInitialized,
    isPlaying,
    volume,
    setIsPlaying,
    setVolume,
    togglePlay,
    initializeAudioContext,
  };
};