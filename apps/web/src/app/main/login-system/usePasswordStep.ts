'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { LoginStep } from './types';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną wielką literę')
    .regex(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę'),
});

type PasswordForm = z.infer<typeof passwordSchema>;

interface PasswordStepHookProps {
  password: string;
  setPassword: (password: string) => void;
  setLoginStep: (step: LoginStep) => void;
  csrfToken: string | null;
}

interface PasswordStepHookReturn {
  register: ReturnType<typeof useForm<PasswordForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<PasswordForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<PasswordForm>>['formState']['errors'];
  isSubmitting: boolean;
}

export function usePasswordStep({
  password,
  setPassword,
  setLoginStep,
  csrfToken,
}: PasswordStepHookProps): PasswordStepHookReturn {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    setValue,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password },
  });

  useEffect(() => {
    setValue('password', password);
  }, [password, setValue]);

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const onSubmit = async (data: PasswordForm) => {
    if (!csrfToken) {
      console.error('Brak tokenu CSRF');
      return;
    }
    const sanitizedPassword = DOMPurify.sanitize(data.password);
    setPassword(sanitizedPassword);
    // Tutaj można dodać logikę wysyłania do API z użyciem csrfToken
    setLoginStep('twoFactor');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
