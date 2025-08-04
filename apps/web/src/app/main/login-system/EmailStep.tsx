'use client';

import { useEmailStep } from './useEmailStep';
import { LoginStep } from './types';
import Button from '@/components/ui/my/Button';

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
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useEmailStep({
      email,
      setEmail,
      setIsValidEmail,
      setLoginStep,
    });
  console.log(`[EmailStep.tsx]`);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-foreground"
          aria-describedby={errors.email ? 'email-error' : undefined}
        >
          Adres e-mail
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded border border-foreground/50 p-3 font-mono text-foreground transition-colors focus:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          placeholder="user@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-xs text-red-500"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting || !!errors.email}
        isLoading={isSubmitting}
      >
        Weryfikuj e-mail
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setLoginStep('initial')}
        ariaLabel="Powrót do ekranu początkowego"
      >
        ← Powrót
      </Button>
    </form>
  );
}
