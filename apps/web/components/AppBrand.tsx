// components/AppBrand.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export function AppBrand() {
  const [glitchText, setGlitchText] = useState('SYSTEM KASANDRA');
  const [isGlitching, setIsGlitching] = useState(false);
  const lastGlitchTime = useRef(0);
  const lastFrameTime = useRef(0);
  const glitchFrameId = useRef<number | null>(null);
  const iterationsRef = useRef(0);

  // Matrix-style glitch effect z requestAnimationFrame
  useEffect(() => {
    const originalText = 'SYSTEM KASANDRA';
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
    const glitchDuration = 50; // Czas między aktualizacjami liter (ms)
    const glitchInterval = 8000; // Odstęp między glitchami (ms)

    const animateGlitch = (currentTime: number) => {
      if (currentTime - lastGlitchTime.current >= glitchInterval && !isGlitching) {
        setIsGlitching(true);
        iterationsRef.current = 0;
        lastGlitchTime.current = currentTime;
        lastFrameTime.current = currentTime;
      }

      if (isGlitching) {
        if (currentTime - lastFrameTime.current >= glitchDuration) {
          setGlitchText(
            originalText
              .split('')
              .map((char, index) => {
                if (index < iterationsRef.current) {
                  return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              })
              .join('')
          );

          iterationsRef.current += 1 / 3;
          lastFrameTime.current = currentTime;

          if (iterationsRef.current >= originalText.length) {
            setGlitchText(originalText);
            setIsGlitching(false);
            lastGlitchTime.current = currentTime;
          }
        }
      }

      glitchFrameId.current = requestAnimationFrame(animateGlitch);
    };

    glitchFrameId.current = requestAnimationFrame(animateGlitch);

    return () => {
      if (glitchFrameId.current) {
        cancelAnimationFrame(glitchFrameId.current);
      }
    };
  }, [isGlitching]);

  return (
    <Link
      href="/"
      className="group relative flex items-center justify-center space-x-4 p-4 min-h-[150px] w-full max-w-[800px] mx-auto"
    >
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90 blur-sm" />

      {/* Animated Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 opacity-20 rounded-lg transition-opacity duration-300 group-hover:opacity-30" />
      <div className="absolute inset-0 border-2 border-green-400/30 rounded-lg group-hover:border-green-400/60 transition-colors duration-300" />

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-center space-x-4">
        {/* Main Title */}
        <div className="flex flex-col items-center min-w-[200px]">
          <h1
            className={`text-3xl font-mono font-black tracking-wider text-green-400 drop-shadow-lg w-[200px] text-center will-change-transform ${
              isGlitching ? 'animate-glitch' : ''
            }`}
          >
            <span className="relative inline-block">
              {glitchText}
              <span
                className="absolute inset-0 text-cyan-400 opacity-70 transform translate-x-0.5 translate-y-0.5 mix-blend-screen"
                aria-hidden="true"
              >
                {glitchText}
              </span>
              <span
                className="absolute inset-0 text-red-400 opacity-50 transform -translate-x-0.5 -translate-y-0.5 mix-blend-screen"
                aria-hidden="true"
              >
                {glitchText}
              </span>
            </span>
          </h1>
          {/* <div className="text-xs font-mono text-green-300/80 tracking-widest mt-1 flex items-center">
            <span className="mr-2">{'>'}</span>
            <span>NEURAL NETWORK INITIALIZED</span>
            <span className="ml-2 w-2 h-3 bg-green-400 animate-pulse" />
          </div> */}
        </div>

        {/* Logo Container */}
        <div className="relative group/logo">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 opacity-30 blur-sm transition-opacity duration-300 group-hover/logo:opacity-50" />
          <div className="absolute -inset-1 rounded-full border border-green-400/50 transition-opacity duration-300 group-hover/logo:opacity-75" />

          <div className="relative bg-black/80 rounded-full p-2 border border-green-400/30 group-hover/logo:border-green-400/60 transition-all duration-300">
            <Image
              src="/project-root/images/logo.png"
              alt="Kasandra System Logo"
              className="rounded-full filter brightness-110 contrast-125 hue-rotate-90 group-hover/logo:brightness-125 group-hover/logo:contrast-150 transition-all duration-300"
              width={100}
              height={100}
              priority
              placeholder="blur"
              blurDataURL="/project-root/images/logo-placeholder.png"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/10 via-transparent to-cyan-400/10 group-hover/logo:from-green-400/20 group-hover/logo:to-cyan-400/20 transition-all duration-300" />
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="flex space-x-1 opacity-60">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-green-400 animate-pulse"
                  style={{
                    height: `${10 + i * 5}px`,
                    animationDelay: `${i * 200}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Title */}
        <div className="flex flex-col items-center min-w-[200px]">
          <h2 className="text-2xl font-mono font-bold text-cyan-400 tracking-wide drop-shadow-lg w-[200px] text-center">
            <span className="relative inline-block">
              STRATEGIC
              <span
                className="absolute inset-0 text-green-400 opacity-50 transform translate-x-0.5 mix-blend-screen"
                aria-hidden="true"
              >
                STRATEGIC
              </span>
            </span>
          </h2>
          <h2 className="text-xl font-mono font-semibold text-green-300 tracking-wider mt-1 w-[200px] text-center">
            <span className="relative inline-block">
              SECURITY CENTER
              <span
                className="absolute inset-0 text-cyan-400 opacity-40 transform -translate-x-0.5 mix-blend-screen"
                aria-hidden="true"
              >
                SECURITY CENTER
              </span>
            </span>
          </h2>
          <div className="flex items-center mt-2 text-xs font-mono text-green-400/70">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </Link>
  );
}