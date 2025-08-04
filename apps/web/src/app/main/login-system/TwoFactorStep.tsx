'use client';

import { useTwoFactorStep } from './useTwoFactorStep';
import Button from '@/components/ui/my/Button';
import Input from '@/components/ui/my/Input';
import { useAuth } from './AuthContext';

export default function TwoFactorStep() {
  const { setLoginStep, user } = useAuth();
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useTwoFactorStep();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="code"
          className="mb-2 block text-sm font-medium text-foreground"
          aria-describedby={errors.code ? 'code-error' : undefined}
        >
          Kod 2FA
        </label>
        <Input
          id="code"
          type="text"
          {...register('code')}
          placeholder="Wpisz kod 2FA"
          size="md"
          variant="primary"
          disabled={isSubmitting}
          isInvalid={!!errors.code}
          ariaDescribedBy={errors.code ? 'code-error' : undefined}
        />
        {errors.code && (
          <p id="code-error" className="mt-1 text-xs text-red-500" role="alert">
            {errors.code.message}
          </p>
        )}
      </div>
      <p className="text-sm text-foreground/70">E-mail: {user?.email}</p>
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Weryfikuj kod
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setLoginStep('password')}
        ariaLabel="Powrót do kroku hasła"
      >
        ← Powrót
      </Button>
    </form>
  );
}
