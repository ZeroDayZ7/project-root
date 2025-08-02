'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { LoginStep } from './types';
import { useEffect } from 'react';
import mockData from './mock-data';

const passwordSchema = z.object({
  password: z.string().min(1, 'Hasło jest wymagane'),
});

type PasswordForm = z.infer<typeof passwordSchema>;

interface PasswordStepProps {
  email: string;
  password: string; // Dodano password
  setPassword: (password: string) => void;
  setLoginStep: (step: LoginStep) => void;
}

export default function PasswordStep({
  email,
  password,
  setPassword,
  setLoginStep,
}: PasswordStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
    setValue,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password },
  });

  // Synchronizacja wartości password z props
  useEffect(() => {
    setValue('password', password);
  }, [password, setValue]);

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const onSubmit = (data: PasswordForm) => {
    const sanitizedPassword = DOMPurify.sanitize(data.password);
    const user = mockData.find(
      (u) => u.email === email && u.password === sanitizedPassword,
    );
    if (!user) {
      setError('password', { message: 'Nieprawidłowe hasło' });
      return;
    }
    setPassword(sanitizedPassword);
    setLoginStep(user.has2FA ? 'twoFactor' : 'success');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-sm text-foreground mb-4">
        Email zweryfikowany:{' '}
        <span className="text-accent-foreground">{email}</span>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm text-foreground mb-2"
          aria-describedby={errors.password ? 'password-error' : undefined}
        >
          {'>'} HASŁO DOSTĘPU:
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full bg-black/50 border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none font-mono"
          placeholder="••••••••"
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p
            id="password-error"
            className="text-red-500 text-xs mt-1"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-foreground/20 hover:bg-foreground/30 focus-visible:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        disabled={!!errors.password}
      >
        AUTORYZUJ DOSTĘP
      </button>
      <button
        type="button"
        onClick={() => setLoginStep('email')}
        className="w-full text-foreground/70 hover:text-foreground focus-visible:text-foreground text-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        ← ZMIEŃ EMAIL
      </button>
    </form>
  );
}
