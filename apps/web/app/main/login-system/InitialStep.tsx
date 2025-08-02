'use client';

import { LoginStep } from './types';

interface InitialStepProps {
  setLoginStep: (step: LoginStep) => void;
}

export default function InitialStep({ setLoginStep }: InitialStepProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => setLoginStep('email')}
        className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors relative overflow-hidden group"
      >
        <span className="relative z-10">INICJUJ LOGOWANIE</span>
      </button>
      <button className="w-full bg-accent-foreground/20 hover:bg-accent-foreground/30 border border-accent-foreground rounded p-3 text-accent-foreground transition-colors">
        REJESTRACJA NOWEGO UŻYTKOWNIKA
      </button>
    </div>
  );
}
