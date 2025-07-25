// components/AppBrand.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export function AppBrand() {
  return (
    <Link
      href="/"
      className="group relative flex items-center justify-center p-4 min-h-[120px] w-full max-w-[800px] mx-auto"
    >
      {/* Subtelne tło */}
      <div className="absolute inset-0 bg-black rounded-lg opacity-90" />

      {/* Ramka pojawiająca się przy hover */}
      <div className="absolute inset-0 border border-green-400/20 rounded-lg" />

      <div className="relative z-10 flex items-center space-x-8 w-full justify-between">
        {/* Lewy tekst */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-mono font-bold tracking-wide text-green-400">
            SYSTEM KASANDRA
          </h1>
          <div className="text-xs font-mono text-green-400/70 mt-1 flex items-center">
            <span className="mr-1">{'>>'}</span>

          </div>
        </div>

        {/* Logo */}
        <div className="relative group/logo">
          <div className="relative bg-black/80 rounded-full p-1 border border-green-400/30">
            <Image
              src="/images/logo.png"
              alt="System Logo"
              width={80}
              height={80}
              className="rounded-full brightness-110"
              priority
              className="rounded-full grayscale brightness-75 transition-all duration-500 group-hover/logo:grayscale-0 group-hover/logo:brightness-110"
            />
          </div>
        </div>

        {/* Prawy tekst */}
        <div className="flex flex-col items-end">
          <h2 className="text-xl font-mono font-semibold text-green-300">
            STRATEGIC
          </h2>
          <h2 className="text-lg font-mono text-green-400/90 mt-1">
            SECURITY CENTER
          </h2>
          <div className="text-xs font-mono text-green-400/70 mt-1 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Narożniki - tylko wizualne */}
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-green-400/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-green-400/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-green-400/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-green-400/40" />
    </Link>
  );
}