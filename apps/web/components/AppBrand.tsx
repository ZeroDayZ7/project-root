// components/AppBrand.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { prefix } from '@/lib/prefix';

export function AppBrand() {
  return (
    <Link
      href="/"
<<<<<<< HEAD
      className="group relative flex flex-col sm:flex-row items-center justify-center gap-4 p-4 min-h-[120px] w-full max-w-[800px] mx-auto"
=======
      className="group relative flex items-center justify-center p-4 min-h-[120px] w-full max-w-[800px] mx-auto"
>>>>>>> parent of 894db9a (feat(ui): add new components including Badge, Card, Dialog, DropdownMenu, HoverCard, Label, Popover, Separator, Switch, and ThemeToggle features)
    >
      {/* Subtelne tło */}
      <div className="absolute inset-0 bg-black rounded-lg opacity-90" />

      {/* Ramka pojawiająca się przy hover */}
<<<<<<< HEAD
      <div className="absolute inset-0 border border-primary/20 rounded-lg" />

      {/* Zawartość */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 w-full">
=======
      <div className="absolute inset-0 border border-green-400/20 rounded-lg" />

      <div className="relative z-10 flex items-center space-x-8 w-full justify-between">
>>>>>>> parent of 894db9a (feat(ui): add new components including Badge, Card, Dialog, DropdownMenu, HoverCard, Label, Popover, Separator, Switch, and ThemeToggle features)
        {/* Lewy tekst */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-mono font-bold tracking-wide text-green-400">SYSTEM KASANDRA</h1>
          <div className="text-xs font-mono text-green-400/70 mt-1 flex items-center">
            <span className="mr-1">{'>>'}</span>
          </div>
        </div>

        {/* Logo */}
        <div className="relative group/logo">
<<<<<<< HEAD
          <div className="relative bg-background/80 rounded-full p-1 border border-primary/30">
=======
          <div className="relative bg-black/80 rounded-full p-1 border border-green-400/30">
>>>>>>> parent of 894db9a (feat(ui): add new components including Badge, Card, Dialog, DropdownMenu, HoverCard, Label, Popover, Separator, Switch, and ThemeToggle features)
            <Image
              src={`${prefix}/images/logo1.png`}
              alt="System Logo"
              width={80}
              height={80}
              priority
<<<<<<< HEAD
              className="rounded-full border-2 border-transparent hover:border-primary hover:shadow-[0_0_8px_var(--primary)] duration-500"
=======
              // Delikatne poświata neonowa
              // className="rounded-full hover:shadow-[0_0_10px_#00ff7f] duration-200"
              // Rotacja + pulsujący glow
              // className="rounded-full transform hover:scale-105 hover:rotate-3 hover:shadow-[0_0_15px_#00ff7f] duration-500 ease-in-out"
              // Podświetlona obwódka (border glow)
              className="rounded-full border-2 border-transparent hover:border-[#00ff7f] hover:shadow-[0_0_8px_#00ff7f] duration-500"
>>>>>>> parent of 894db9a (feat(ui): add new components including Badge, Card, Dialog, DropdownMenu, HoverCard, Label, Popover, Separator, Switch, and ThemeToggle features)
            />
          </div>
        </div>

        {/* Prawy tekst */}
        <div className="flex flex-col items-end">
          <h2 className="text-xl font-mono font-semibold text-green-300">STRATEGIC</h2>
          <h2 className="text-lg font-mono text-green-400/90 mt-1">SECURITY CENTER</h2>
          <div className="text-xs font-mono text-green-400/70 mt-1 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </div>

      {/* Narożniki - tylko wizualne */}
<<<<<<< HEAD
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-primary/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-primary/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-primary/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-primary/40" />
=======
      <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-green-400/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-green-400/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-green-400/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-green-400/40" />
>>>>>>> parent of 894db9a (feat(ui): add new components including Badge, Card, Dialog, DropdownMenu, HoverCard, Label, Popover, Separator, Switch, and ThemeToggle features)
    </Link>
  );
}
