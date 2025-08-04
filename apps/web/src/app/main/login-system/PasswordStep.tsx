'use client';

import { usePasswordStep } from './usePasswordStep';
import { LoginStep } from './types';

interface PasswordStepProps {
  email: string;
  password: string;
  setPassword: (password: string) => void;
  setLoginStep: (step: LoginStep) => void;
  csrfToken: string | null;
}

export default function PasswordStep({
  email,
  password,
  setPassword,
  setLoginStep,
  csrfToken,
}: PasswordStepProps) {
  const { register, handleSubmit, errors, isSubmitting } = usePasswordStep({
    password,
    setPassword,
    setLoginStep,
    csrfToken,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
          aria-describedby={errors.password ? 'password-error' : undefined}
        >
          Hasło
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full rounded border border-foreground/50 p-3 font-mono text-foreground transition-colors focus:border-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
          placeholder="Wpisz hasło"
          aria-invalid={errors.password ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p
            id="password-error"
            className="mt-1 text-xs text-red-500"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <p className="text-sm text-foreground/70">E-mail: {email}</p>
      <button
        type="submit"
        className="w-full rounded border border-foreground bg-foreground/20 p-3 font-bold text-foreground transition-colors hover:bg-foreground/30 focus-visible:bg-foreground/30 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting || !!errors.password}
        aria-busy={isSubmitting ? 'true' : 'false'}
      >
        {isSubmitting ? 'Weryfikowanie...' : 'Weryfikuj hasło'}
      </button>
      <button
        type="button"
        onClick={() => setLoginStep('email')}
        className="w-full text-sm text-foreground/70 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Powrót do kroku e-mail"
      >
        ← Powrót
      </button>
    </form>
  );
}
