'use client';

import { useEmailStep } from '../hooks/useEmailStep';
import Button from '@/components/ui/my/Button';
import Input from '@/components/ui/my/Input';
import Label from '@/components/ui/my/Label';
import InputError from '@/components/ui/my/InputError';

export default function EmailStep() {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } = useEmailStep();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="flex flex-col">
        <Label htmlFor="email" describedBy={errors.email ? 'email-error' : undefined}>
          Adres e-mail
        </Label>

        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="user@example.com"
          inputSize="md"
          variant="primary"
          disabled={isSubmitting}
          isInvalid={!!errors.email}
          ariaDescribedBy={errors.email ? 'email-error' : undefined}
        />
        <InputError id="email-error" message={errors.email?.message} />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        // disabled={isSubmitting}
        // isLoading={isSubmitting}
      >
        Dalej
      </Button>
     
    </form>
  );
}
