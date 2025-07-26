// components/SystemStatus.tsx
'use client';

export function SystemStatus() {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-primary/70 mt-1">
      <div className="relative">
        <div className="absolute animate-ping inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
        <div className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </div>
      <span>STATUS: ONLINE</span>
    </div>
  );
}
