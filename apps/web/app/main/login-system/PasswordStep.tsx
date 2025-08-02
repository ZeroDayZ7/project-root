'use client';

import { LoginStep } from './types';

interface PasswordStepProps {
  email: string;
  password: string;
  setPassword: (password: string) => void;
  setLoginStep: (step: LoginStep) => void;
}

export default function PasswordStep({
  email,
  password,
  setPassword,
  setLoginStep,
}: PasswordStepProps) {
  const handlePasswordSubmit = () => {
    if (password.length > 0) {
      setLoginStep('success');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-foreground mb-4">
        Email zweryfikowany:{' '}
        <span className="text-accent-foreground">{email}</span>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm text-foreground mb-2"
        >
          {'>'} HASŁO DOSTĘPU:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/50 border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus:outline-none font-mono"
          placeholder="••••••••"
          autoFocus
        />
      </div>
      <button
        onClick={handlePasswordSubmit}
        disabled={password.length === 0}
        className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        AUTORYZUJ DOSTĘP
      </button>
      <button
        onClick={() => setLoginStep('email')}
        className="w-full text-foreground/70 hover:text-foreground text-sm transition-colors"
      >
        ← ZMIEŃ EMAIL
      </button>
    </div>
  );
}
