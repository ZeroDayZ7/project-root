'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { LoginStep } from './types';
import { useEffect } from 'react';

const emailSchema = z.object({
  email: z
    .string()
    .email('Podaj prawidłowy adres e-mail')
    .min(1, 'E-mail jest wymagany'),
});

type EmailForm = z.infer<typeof emailSchema>;

interface EmailStepProps {
  email: string; // Dodano email
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email:
        email ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('lastEmail') || ''
          : ''),
    },
  });

  // Synchronizacja wartości email z props
  useEffect(() => {
    setValue('email', email);
  }, [email, setValue]);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = (data: EmailForm) => {
    const sanitizedEmail = DOMPurify.sanitize(data.email);
    setEmail(sanitizedEmail);
    setIsValidEmail(true);
    localStorage.setItem('lastEmail', sanitizedEmail);
    setLoginStep('password');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm text-foreground mb-2"
          aria-describedby={errors.email ? 'email-error' : undefined}
        >
          {'>'} ADRES EMAIL:
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none font-mono"
          placeholder="user@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p
            id="email-error"
            className="text-red-500 text-xs mt-1"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-foreground/20 hover:bg-foreground/30 focus-visible:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        disabled={!!errors.email}
      >
        WERYFIKUJ EMAIL
      </button>
      <button
        type="button"
        onClick={() => setLoginStep('initial')}
        className="w-full text-foreground/70 hover:text-foreground focus-visible:text-foreground text-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        ← POWRÓT
      </button>
    </form>
  );
}
