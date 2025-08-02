'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { LoginStep } from './types';
import { useEffect } from 'react';
import mockData from './mock-data';

const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'Kod 2FA musi mieć 6 znaków')
    .max(6, 'Kod 2FA musi mieć 6 znaków'),
});

type TwoFactorForm = z.infer<typeof twoFactorSchema>;

interface TwoFactorStepProps {
  email: string;
  setLoginStep: (step: LoginStep) => void;
}

export default function TwoFactorStep({
  email,
  setLoginStep,
}: TwoFactorStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<TwoFactorForm>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '123456' },
  });

  useEffect(() => {
    setFocus('code');
  }, [setFocus]);

  const onSubmit = (data: TwoFactorForm) => {
    const sanitizedCode = DOMPurify.sanitize(data.code);
    const user = mockData.find(
      (u) => u.email === email && u.twoFactorCode === sanitizedCode,
    );
    if (!user) {
      setError('code', { message: 'Nieprawidłowy kod 2FA' });
      return;
    }
    setLoginStep('success');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-sm text-foreground mb-4">
        Email zweryfikowany:{' '}
        <span className="text-accent-foreground">{email}</span>
      </div>
      <div>
        <label
          htmlFor="code"
          className="block text-sm text-foreground mb-2"
          aria-describedby={errors.code ? 'code-error' : undefined}
        >
          {'>'} KOD 2FA:
        </label>
        <input
          id="code"
          type="text"
          {...register('code')}
          className="w-full bg-black/50 border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none font-mono"
          placeholder="123456"
          aria-invalid={errors.code ? 'true' : 'false'}
        />
        {errors.code && (
          <p id="code-error" className="text-red-500 text-xs mt-1" role="alert">
            {errors.code.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-foreground/20 hover:bg-foreground/30 focus-visible:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        disabled={!!errors.code}
      >
        WERYFIKUJ KOD 2FA
      </button>
      <button
        type="button"
        onClick={() => setLoginStep('password')}
        className="w-full text-foreground/70 hover:text-foreground focus-visible:text-foreground text-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        ← ZMIEŃ HASŁO
      </button>
    </form>
  );
}
