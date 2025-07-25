'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function AppBrand() {
  const [glitchText, setGlitchText] = useState('SYSTEM KASANDRA');
  const [isGlitching, setIsGlitching] = useState(false);

  // Matrix-style glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      const glitchChars = '你好世界こんにちは世界';
      const originalText = 'SYSTEM KASANDRA';
      let iterations = 0;
      
      const glitchInterval = setInterval(() => {
        setGlitchText(
          originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('')
        );
        
        if (iterations >= originalText.length) {
          clearInterval(glitchInterval);
          setGlitchText(originalText);
          setIsGlitching(false);
        }
        
        iterations += 1 / 3;
      }, 30);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/" className="group relative flex items-center justify-center space-x-6 p-4">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90 blur-sm"></div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 opacity-20 animate-pulse rounded-lg"></div>
      <div className="absolute inset-0 border-2 border-green-400/30 rounded-lg group-hover:border-green-400/60 transition-colors duration-300"></div>
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent animate-pulse"></div>
      
      <div className="relative z-10 flex items-center space-x-6">
        {/* Main Title */}
        <div className="flex flex-col items-center">
          <h1 className={`text-3xl font-mono font-black tracking-wider text-green-400 drop-shadow-lg filter ${
            isGlitching ? 'animate-pulse' : ''
          }`}>
            <span className="relative">
              {glitchText}
              {/* Glitch overlay */}
              <span className="absolute inset-0 text-cyan-400 opacity-70 transform translate-x-0.5 translate-y-0.5 mix-blend-screen">
                {glitchText}
              </span>
              <span className="absolute inset-0 text-red-400 opacity-50 transform -translate-x-0.5 -translate-y-0.5 mix-blend-screen">
                {glitchText}
              </span>
            </span>
          </h1>
          
          {/* Subtitle with typewriter effect */}
          <div className="text-xs font-mono text-green-300/80 tracking-widest mt-1 flex items-center">
            <span className="mr-2">{'>'}</span>
            <span className="animate-pulse">NEURAL NETWORK INITIALIZED</span>
            <span className="ml-2 w-2 h-3 bg-green-400 animate-pulse"></span>
          </div>
        </div>

        {/* Logo Container */}
        <div className="relative group/logo">
          {/* Holographic ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 opacity-30 animate-spin-slow blur-sm"></div>
          <div className="absolute -inset-1 rounded-full border border-green-400/50 animate-pulse"></div>
          
          {/* Logo */}
          <div className="relative bg-black/80 rounded-full p-2 border border-green-400/30 group-hover/logo:border-green-400/60 transition-all duration-300">
            <Image
              src="/project-root/images/logo.png"
              alt="Kasandra System Logo"
              className="rounded-full filter brightness-110 contrast-125 hue-rotate-90 group-hover/logo:brightness-125 group-hover/logo:contrast-150 transition-all duration-300"
              width={77}
              height={79}
              priority
            />
            {/* Matrix overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/10 via-transparent to-cyan-400/10 group-hover/logo:from-green-400/20 group-hover/logo:to-cyan-400/20 transition-all duration-300"></div>
          </div>

          {/* Data stream effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="flex space-x-1 opacity-60">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-green-400 animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`, 
                    animationDelay: `${i * 200}ms`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Title */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-mono font-bold text-cyan-400 tracking-wide drop-shadow-lg">
            <span className="relative">
              STRATEGIC
              <span className="absolute inset-0 text-green-400 opacity-50 transform translate-x-0.5 mix-blend-screen">
                STRATEGIC
              </span>
            </span>
          </h2>
          <h2 className="text-xl font-mono font-semibold text-green-300 tracking-wider mt-1">
            <span className="relative">
              SECURITY CENTER
              <span className="absolute inset-0 text-cyan-400 opacity-40 transform -translate-x-0.5 mix-blend-screen">
                SECURITY CENTER
              </span>
            </span>
          </h2>
          
          {/* Status indicator */}
          <div className="flex items-center mt-2 text-xs font-mono text-green-400/70">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </Link>
  );
}