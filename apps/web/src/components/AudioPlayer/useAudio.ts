'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioProps {
  audioSrc: string;
  initialVolume?: number; // volume opcjonalny
}

interface AudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  sourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  isInitialized: boolean;
  isPlaying: boolean;
  volume: number;
  error: string | null;
  setIsPlaying: (v: boolean) => void;
  setVolume: (v: number) => void;
  togglePlay: () => Promise<void>;
  initializeAudioContext: () => void;
}

export const useAudio = ({
  audioSrc,
  initialVolume = 100,
}: UseAudioProps): AudioState => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  /** 🔹 Tworzenie elementu audio */
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.loop = true;
    audio.crossOrigin = 'anonymous';
    audio.volume = initialVolume / 100;

    const handleReady = () => setIsInitialized(true);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('useAudio: Błąd ładowania audio');
      setError('Nie udało się załadować audio');
    };

    audio.addEventListener('canplaythrough', handleReady);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audioRef.current = null;
      audio.removeEventListener('canplaythrough', handleReady);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if (audioContext) {
        audioContext.close().catch(() => {});
      }
    };
  }, [audioSrc]);

  /** 🔹 Aktualizacja głośności */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  /** 🔹 Inicjalizacja Web Audio API (tylko raz) */
  const initializeAudioContext = useCallback(() => {
    if (!audioRef.current || audioContext) return;

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) {
      setError('Web Audio API nie jest wspierane');
      return;
    }

    try {
      const ctx = new AC();
      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 128;
      analyserNode.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);

      setAudioContext(ctx);
      setAnalyser(analyserNode);
      sourceRef.current = source;
    } catch (err) {
      console.error('useAudio: Błąd inicjalizacji Web Audio API:', err);
      setError('Błąd inicjalizacji audio');
    }
  }, [audioContext]);

  /** 🔹 Play / Pause */
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isInitialized) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (!audioContext) initializeAudioContext();
        if (audioContext?.state === 'suspended') await audioContext.resume();

        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('useAudio: Błąd odtwarzania', err);
      setError('Nie udało się odtworzyć audio');
    }
  }, [isPlaying, isInitialized, audioContext, initializeAudioContext]);

  return {
    audioRef,
    audioContext,
    analyser,
    sourceRef,
    isInitialized,
    isPlaying,
    volume,
    error,
    setIsPlaying,
    setVolume,
    togglePlay,
    initializeAudioContext,
  };
};
