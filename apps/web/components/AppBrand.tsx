'use client';

import Link from 'next/link';
import Image from 'next/image';
import { prefix } from '@/lib/prefix';

export function AppBrand() {
  return (
    <Link
      href="/"
      className="group relative flex flex-col sm:flex-row items-center justify-center gap-4 p-4 min-h-[120px] w-full max-w-[800px] mx-auto"
    >
      {/* Subtelne tło */}
      <div className="absolute inset-0 bg-background rounded-lg opacity-90" />

      {/* Ramka pojawiająca się przy hover */}
      <div className="absolute inset-0 border border-primary/20 rounded-lg" />

      {/* Zawartość */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 w-full">
        {/* Lewy tekst */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-wide text-primary">
            SYSTEM KASANDRA
          </h1>
          <div className="text-xs font-mono text-primary/70 mt-1 flex items-center">
            <span className="mr-1">{'>>'}</span>
          </div>
        </div>

        {/* Logo */}
        <div className="relative group/logo">
          <div className="relative bg-background/80 rounded-full p-1 border border-primary/30">
            <Image
              src={`${prefix}/images/logo1.png`}
              alt="System Logo"
              width={64}
              height={64}
              priority
              className="rounded-full border-2 border-transparent hover:border-primary hover:shadow-[0_0_8px_var(--primary)] duration-500"
            />
          </div>
        </div>

        {/* Prawy tekst */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-primary/70">STRATEGIC</h2>
          <h2 className="text-base sm:text-lg font-mono text-primary/90 mt-1">SECURITY CENTER</h2>
          <div className="text-xs font-mono text-primary/70 mt-1 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Narożniki - tylko wizualne */}
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-primary/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-primary/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-primary/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-primary/40" />
    </Link>
  );
}
