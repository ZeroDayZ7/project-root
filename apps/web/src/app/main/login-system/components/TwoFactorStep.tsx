'use client';

import { useTwoFactorStep } from '../hooks/useTwoFactorStep';
import Button from '@/components/ui/my/Button';
import Input from '@/components/ui/my/Input';
import { useLogin } from '../LoginContext';
import InputError from '@/components/ui/my/InputError';

export default function TwoFactorStep() {
  const { setLoginStep, user } = useLogin();
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useTwoFactorStep();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <label
          htmlFor="code"
          className="mb-2 block text-sm font-medium"
          aria-describedby={errors.code ? 'code-error' : undefined}
        >
          Kod 2FA
        </label>
        <Input
          id="code"
          type="text"
          {...register('code')}
          placeholder="Wpisz kod 2FA"
          inputSize="md"
          variant="primary"
          disabled={isSubmitting}
          isInvalid={!!errors.code}
          ariaDescribedBy={errors.code ? 'code-error' : undefined}
        />
        <InputError id="code-error" message={errors.code?.message} />
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
    </form>
  );
}
