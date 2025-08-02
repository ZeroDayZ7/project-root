'use client';

import Link from 'next/link';
import Image from 'next/image';
import { prefix } from '@/lib/prefix';

export function AppBrand() {
  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 p-4 min-h-[120px] w-full max-w-[800px] mx-auto">
      {/* Subtelne tło */}
      <div className="absolute inset-0 rounded-lg opacity-90" />

      {/* Ramka */}
      <div className="absolute inset-0 border border-primary-foreground/20 rounded-lg" />

      {/* Zawartość */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        {/* Lewy tekst */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-wide text-primary-foreground">
            SYSTEM KASANDRA
          </h1>
          <div className="text-xs font-mono text-primary-foreground/70 mt-1 flex items-center">
            <span className="mr-1">{'>>'}</span>
          </div>
        </div>

        {/* Logo z linkiem i animacją */}
        <Link href="/" className="group/logo relative">
          <div className="relative bg-background/80 rounded-full p-1 border border-primary-foreground/30 transition-transform duration-500 group-hover/logo:scale-105 group-hover/logo:rotate-2">
            <Image
              src={`${prefix}/images/logo1.png`}
              alt="System Logo"
              width={64}
              height={64}
              priority
              className="rounded-full border-2 border-transparent group-hover/logo:border-primary-foreground group-hover/logo:shadow-[0_0_12px_var(--primary-foreground)] transition-all duration-500"
            />
          </div>
        </Link>

        {/* Prawy tekst */}
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <h2 className="text-lg sm:text-xl font-mono font-semibold text-primary-foreground/70">
            STRATEGIC
          </h2>
          <h2 className="text-base sm:text-lg font-mono text-primary-foreground/90 mt-1">
            SECURITY CENTER
          </h2>
          <div className="text-xs font-mono text-primary-foreground/70 mt-1 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Narożniki */}
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-primary-foreground/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-primary-foreground/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-primary-foreground/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-primary-foreground/40" />
    </div>
  );
}
