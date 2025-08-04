'use client';

import { useEmailStep } from './useEmailStep';
import Button from '@/components/ui/my/Button';
import Input from '@/components/ui/my/Input';
import { useAuth } from './AuthContext';

export default function EmailStep() {
  const { setLoginStep } = useAuth();
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useEmailStep();

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
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="user@example.com"
          size="md"
          variant="primary"
          disabled={isSubmitting}
          isInvalid={!!errors.email}
          ariaDescribedBy={errors.email ? 'email-error' : undefined}
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
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        Dalej
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
