'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioProps {
  audioSrc: string;
  initialVolume: number;
}

interface AudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  sourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  analyserGainNodeRef: React.MutableRefObject<GainNode | null>; // Nowy ref dla GainNode
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
  const analyserGainNodeRef = useRef<GainNode | null>(null); // Referencja do GainNode

  // Inicjalizacja audio (raz na załadowanie komponentu)
  useEffect(() => {
    console.log('useAudio: Initializing audio element.', { audioSrc });
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.crossOrigin = 'anonymous'; // Ważne dla analizy audio z innych domen
    audio.volume = volume / 100;

    audio.addEventListener('canplaythrough', () => {
      console.log('useAudio: Audio is ready to play.');
      setIsInitialized(true);
    }, { once: true }); // Użyj { once: true }, aby uniknąć wielokrotnego wywołania

    audio.addEventListener('ended', () => {
      console.log('useAudio: Audio ended.');
      setIsPlaying(false);
    });

    audio.addEventListener('error', (e) => {
      console.error('useAudio: Audio error:', e);
      setIsPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      console.log('useAudio: Cleaning up audio.');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Zamykamy AudioContext tylko jeśli został utworzony w tym hooku
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch((error) => console.warn('useAudio: Error closing AudioContext:', error));
      }
    };
  }, [audioSrc]); // Tylko raz, gdy audioSrc się zmieni

  // Aktualizacja głośności
  useEffect(() => {
    if (audioRef.current) {
      console.log('useAudio: Updating volume:', volume);
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Inicjalizacja Web Audio API - memoizowana funkcja
  const initializeAudioContext = useCallback(() => {
    if (!audioRef.current || audioContext) {
      console.log('useAudio: AudioContext already initialized or no audioRef.');
      return;
    }

    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      console.warn('useAudio: Web Audio API not supported in this browser.');
      return;
    }

    try {
      console.log('useAudio: Initializing AudioContext.');
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = ctx.createAnalyser();
      const gainNode = ctx.createGain(); // Tworzymy GainNode

      analyserNode.fftSize = 128;
      analyserNode.smoothingTimeConstant = 0.8; // Wygładzanie danych

      const source = ctx.createMediaElementSource(audioRef.current);
      // Łańcuch: source -> gainNode -> analyserNode -> destination
      source.connect(gainNode); // Podłączamy do GainNode
      gainNode.connect(analyserNode); // GainNode podłączony do AnalyserNode
      analyserNode.connect(ctx.destination);

      setAudioContext(ctx);
      setAnalyser(analyserNode);
      sourceRef.current = source;
      analyserGainNodeRef.current = gainNode; // Zapisujemy referencję do GainNode

      console.log('useAudio: AudioContext, AnalyserNode, and GainNode initialized.');
    } catch (error) {
      console.warn('useAudio: Error initializing Web Audio API:', error);
    }
  }, [audioContext]); // Zależność od audioContext, aby nie inicjować go ponownie

  // Przełączanie play/pause - memoizowana funkcja
  const togglePlay = useCallback(async () => {
    if (!audioRef.current || !isInitialized) {
      console.warn('useAudio: Audio not initialized or no audioRef:', { audioRef: audioRef.current, isInitialized });
      return;
    }

    try {
      if (isPlaying) {
        console.log('useAudio: Pausing audio.');
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('useAudio: Starting playback.');
        if (!audioContext) {
          initializeAudioContext(); // Inicjalizuj kontekst przy pierwszym odtworzeniu
        }

        // Daj czas na inicjalizację AnalyserNode, jeśli jeszcze nie jest dostępny
        if (!analyser) {
          console.log('useAudio: Awaiting AnalyserNode availability.');
          // Użyj Promise.resolve() z setTimeout aby nie blokować UI
          await new Promise(resolve => setTimeout(resolve, 100));
          if (!analyser) { // Sprawdź ponownie po opóźnieniu
            console.warn('useAudio: AnalyserNode still not available after delay.');
            return;
          }
        }

        if (audioContext && audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('useAudio: AudioContext resumed, state:', audioContext.state);
        }

        await audioRef.current.play();
        setIsPlaying(true);
        console.log('useAudio: Playback started.');
      }
    } catch (error) {
      console.error('useAudio: Playback error:', error);
    }
  }, [isPlaying, isInitialized, audioContext, analyser, initializeAudioContext]);


  return {
    audioRef,
    audioContext,
    analyser,
    sourceRef,
    analyserGainNodeRef, // Zwracamy referencję
    isInitialized,
    isPlaying,
    volume,
    setIsPlaying,
    setVolume,
    togglePlay,
    initializeAudioContext,
  };
};