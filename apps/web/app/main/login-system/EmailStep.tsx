'use client';

import { validateEmail } from './utils';
import { LoginStep } from './types';

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  setIsValidEmail: (isValid: boolean) => void;
  setLoginStep: (step: LoginStep) => void;
}

export default function EmailStep({
  email,
  setEmail,
  setIsValidEmail,
  setLoginStep,
}: EmailStepProps) {
  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setIsValidEmail(true);
      setLoginStep('password');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-foreground mb-2">
          {'>'} ADRES EMAIL:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus:outline-none font-mono"
          placeholder="user@example.com"
          autoFocus
        />
      </div>
      <button
        onClick={handleEmailSubmit}
        disabled={!validateEmail(email)}
        className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        WERYFIKUJ EMAIL
      </button>
      <button
        onClick={() => setLoginStep('initial')}
        className="w-full text-foreground/70 hover:text-foreground text-sm transition-colors"
      >
        ← POWRÓT
      </button>
    </div>
  );
}
