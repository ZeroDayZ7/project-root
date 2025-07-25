'use client';
import { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, 
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(20);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const canvasWidth = 300;
  const canvasHeight = 40;
  const numBars = 24;
  const barSpacing = 2;

  // Inicjalizacja audio
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.volume = volume / 100;
      
      audioRef.current.addEventListener('canplaythrough', () => {
        setIsInitialized(true);
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Błąd audio:', e);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioContext) {
        audioContext.close().catch((error) => console.warn('Błąd zamykania AudioContext:', error));
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioSrc, volume]);

  // Inicjalizacja Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    drawStaticBars(); // Rysuj statyczne paski na starcie
  }, []);

  // Inicjalizacja Web Audio API
  const initializeAudioContext = () => {
    if (!audioRef.current || audioContext) return;

    if (!window.AudioContext && !(window as any).webkitAudioContext) {
      console.warn('Web Audio API nie jest wspierane w tej przeglądarce');
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyserNode = ctx.createAnalyser();
      
      analyserNode.fftSize = 128; // Poprawna potęga dwójki
      analyserNode.smoothingTimeConstant = 0.8;
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);
      
      setAudioContext(ctx);
      setAnalyser(analyserNode);
      sourceRef.current = source;
    } catch (error) {
      console.warn('Błąd inicjalizacji Web Audio API:', error);
    }
  };

  // Animacja Equalizera
  const animateEqualizer = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !analyser) {
      console.warn('Brak canvas, context lub analyser:', { canvas, ctx, analyser });
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = Math.floor((canvas.width - (numBars - 1) * barSpacing) / numBars);

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#a855f7');
    gradient.addColorStop(0.5, '#8b5cf6');
    gradient.addColorStop(1, '#7c3aed');

    const renderFrame = () => {
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;

      for (let i = 0; i < numBars; i++) {
        const dataIndex = Math.floor((i / numBars) * bufferLength);
        const dataValue = dataArray[dataIndex] || 0;
        
        const x = i * (barWidth + barSpacing);
        const height = Math.max(2, (dataValue / 255) * canvas.height);
        const y = canvas.height - height;
        
        ctx.beginPath();
        const radius = 2;
        const topRadius = radius;
        const bottomRadius = 0;
        
        ctx.moveTo(x + topRadius, y);
        ctx.lineTo(x + barWidth - topRadius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + topRadius);
        ctx.lineTo(x + barWidth, y + height - bottomRadius);
        ctx.lineTo(x + barWidth, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y + height - bottomRadius);
        ctx.lineTo(x, y + topRadius);
        ctx.quadraticCurveTo(x, y, x + topRadius, y);
        ctx.closePath();
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    animationRef.current = requestAnimationFrame(renderFrame);
  };

  // Statyczne paski
  const drawStaticBars = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;

    const barWidth = Math.floor((canvas.width - (numBars - 1) * barSpacing) / numBars);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';

    for (let i = 0; i < numBars; i++) {
      const x = i * (barWidth + barSpacing);
      const height = Math.random() * 8 + 2;
      const y = canvas.height - height;
      
      ctx.beginPath();
      const radius = 2;
      const topRadius = radius;
      const bottomRadius = 0;
      
      ctx.moveTo(x + topRadius, y);
      ctx.lineTo(x + barWidth - topRadius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + topRadius);
      ctx.lineTo(x + barWidth, y + height - bottomRadius);
      ctx.lineTo(x + barWidth, y + height);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x, y + height - bottomRadius);
      ctx.lineTo(x, y + topRadius);
      ctx.quadraticCurveTo(x, y, x + topRadius, y);
      ctx.closePath();
      ctx.fill();
    }
  };

  // Przełączanie play/pause
  const togglePlay = async () => {
    if (!audioRef.current || !isInitialized) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        drawStaticBars();
      } else {
        if (!audioContext) {
          initializeAudioContext();
        }
        
        if (audioContext && audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        animateEqualizer();
      }
    } catch (error) {
      console.error('Błąd odtwarzania:', error);
    }
  };

  // Zmiana głośności
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Rysuj statyczne paski tylko na starcie lub gdy nie odtwarzamy
  useEffect(() => {
    if (!isPlaying && isInitialized) {
      drawStaticBars();
    }
  }, [isInitialized, isPlaying]);

  return (
    <div className={`bg-purple-400/10 border border-purple-400/30 rounded-lg p-3 ${className}`}>
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-base relative z-10">
              {isPlaying ? '⏸️' : '▶️'}
            </span>
            <span className="relative z-10">
              {isPlaying ? 'ZATRZYMAJ' : 'ODTWÓRZ'}
            </span>
            {isPlaying && (
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse relative z-10" />
            )}
          </button>
        </div>
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
      <div className="bg-black/40 border border-purple-400/20 rounded p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div className="mt-2 text-xs text-purple-400/50 text-center">
        KASANDRA AUDIO SYSTEM • {isPlaying ? 'STREAMING' : 'STANDBY'}
      </div>
    </div>
  );
};