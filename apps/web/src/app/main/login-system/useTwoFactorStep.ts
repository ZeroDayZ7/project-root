'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { LoginStep } from './types';

const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'Kod 2FA musi mieć dokładnie 6 znaków')
    .max(6, 'Kod 2FA musi mieć dokładnie 6 znaków'),
});

type TwoFactorForm = z.infer<typeof twoFactorSchema>;

interface TwoFactorStepHookProps {
  setLoginStep: (step: LoginStep) => void;
}

interface TwoFactorStepHookReturn {
  register: ReturnType<typeof useForm<TwoFactorForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<TwoFactorForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<TwoFactorForm>>['formState']['errors'];
  isSubmitting: boolean;
}

export function useTwoFactorStep({
  setLoginStep,
}: TwoFactorStepHookProps): TwoFactorStepHookReturn {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<TwoFactorForm>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    setFocus('code');
  }, [setFocus]);

  const onSubmit = async (data: TwoFactorForm) => {
    const sanitizedCode = DOMPurify.sanitize(data.code);
    // Tutaj można dodać logikę wysyłania kodu 2FA do API
    setLoginStep('success');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
