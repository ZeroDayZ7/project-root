'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { LoginStep } from './types';
import { ENDPOINTS } from '@/lib/endpoints';

const emailSchema = z.object({
  email: z
    .string()
    .email('Podaj prawidłowy adres e-mail')
    .min(1, 'E-mail jest wymagany'),
});

type EmailForm = z.infer<typeof emailSchema>;

interface EmailStepHookProps {
  email: string;
  setEmail: (email: string) => void;
  setIsValidEmail: (isValid: boolean) => void;
  setLoginStep: (step: LoginStep) => void;
}

interface EmailStepHookReturn {
  register: ReturnType<typeof useForm<EmailForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<EmailForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<EmailForm>>['formState']['errors'];
  isSubmitting: boolean;
  onSubmit: (data: EmailForm) => Promise<void>;
}

export function useEmailStep({
  email,
  setEmail,
  setIsValidEmail,
  setLoginStep,
}: EmailStepHookProps): EmailStepHookReturn {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    setValue,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  });

  useEffect(() => {
    setValue('email', email);
  }, [email, setValue]);

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (data: EmailForm) => {
    const sanitizedEmail = DOMPurify.sanitize(data.email);
    try {
      const res = await fetch(ENDPOINTS.CHECKEMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sanitizedEmail }),
      });

      if (!res.ok) {
        throw new Error('Błąd serwera przy sprawdzaniu e-maila');
      }

      const result = await res.json();
      console.log(`result: ${result}`);

      if (result.exists) {
        setEmail(sanitizedEmail);
        setIsValidEmail(true);
        setLoginStep('password');
      } else {
        throw new Error('Taki e-mail nie istnieje');
      }
    } catch (error) {
      console.error('[Email check failed]', error);
      // TODO: pokaż błąd użytkownikowi (np. toast, alert itp.)
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
