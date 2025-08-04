'use client';

import { useTwoFactorStep } from './useTwoFactorStep';
import { LoginStep } from './types';

interface TwoFactorStepProps {
  email: string;
  setLoginStep: (step: LoginStep) => void;
}

export default function TwoFactorStep({
  email,
  setLoginStep,
}: TwoFactorStepProps) {
  const { register, handleSubmit, errors, isSubmitting } = useTwoFactorStep({
    setLoginStep,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="code"
          className="mb-2 block text-sm font-medium text-foreground"
          aria-describedby={errors.code ? 'code-error' : undefined}
        >
          Kod 2FA
        </label>
        <input
          id="code"
          type="text"
          {...register('code')}
          className="w-full rounded border border-foreground/50 p-3 font-mono text-foreground transition-colors focus:border-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          placeholder="Wpisz kod 2FA"
          aria-invalid={errors.code ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.code && (
          <p id="code-error" className="mt-1 text-xs text-red-500" role="alert">
            {errors.code.message}
          </p>
        )}
      </div>
      <p className="text-sm text-foreground/70">E-mail: {email}</p>
      <button
        type="submit"
        className="w-full rounded border border-foreground bg-foreground/20 p-3 font-bold text-foreground transition-colors hover:bg-foreground/30 focus-visible:bg-foreground/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting || !!errors.code}
        aria-busy={isSubmitting ? 'true' : 'false'}
      >
        {isSubmitting ? 'Weryfikowanie...' : 'Weryfikuj kod'}
      </button>
      <button
        type="button"
        onClick={() => setLoginStep('password')}
        className="w-full text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Powrót do kroku hasła"
      >
        ← Powrót
      </button>
    </form>
  );
}
