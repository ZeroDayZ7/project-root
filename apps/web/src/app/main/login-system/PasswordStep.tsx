'use client';

import { usePasswordStep } from './usePasswordStep';
import Button from '@/components/ui/my/Button';
import Input from '@/components/ui/my/Input';
import { useAuth } from './AuthContext';

export default function PasswordStep() {
  const { setLoginStep, user } = useAuth();
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    usePasswordStep();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-foreground"
          aria-describedby={errors.password ? 'password-error' : undefined}
        >
          Hasło
        </label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Wpisz hasło"
          size="md"
          variant="primary"
          disabled={isSubmitting}
          isInvalid={!!errors.password}
          ariaDescribedBy={errors.password ? 'password-error' : undefined}
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
      <p className="text-sm text-foreground/70">E-mail: {user?.email}</p>
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Dalej
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setLoginStep('email')}
        ariaLabel="Powrót do kroku e-mail"
      >
        ← Powrót
      </Button>
    </form>
  );
}
