'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { LoginStep } from './types';
import { useLogin } from './LoginContext';
import { apiFetch } from '@/lib/apiFetch';

const twoFactorSchema = z.object({
  code: z
    .string()
    .min(6, 'Kod 2FA musi mieć dokładnie 6 znaków')
    .max(6, 'Kod 2FA musi mieć dokładnie 6 znaków'),
});

type TwoFactorForm = z.infer<typeof twoFactorSchema>;

interface TwoFactorStepHookReturn {
  register: ReturnType<typeof useForm<TwoFactorForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<TwoFactorForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<TwoFactorForm>>['formState']['errors'];
  isSubmitting: boolean;
  onSubmit: (data: TwoFactorForm) => Promise<void>;
}

export function useTwoFactorStep(): TwoFactorStepHookReturn {
  const { user, setLoginStep } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<TwoFactorForm>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: { code: '123456' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    setFocus('code');
  }, [setFocus]);

  const onSubmit = async (data: TwoFactorForm) => {
    try {
      const res = await apiFetch('/api/auth/check-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, code: data.code }),
      });

      if (!res.ok) {
        throw new Error('Błąd serwera przy sprawdzaniu kodu 2FA');
      }

      const result = await res.json();
      if (!result.valid) {
        setError('code', { message: 'Nieprawidłowy kod 2FA' });
        return;
      }

      setLoginStep('success');
    } catch (error) {
      console.error('[2FA check failed]', error);
      setError('code', { message: 'Błąd podczas weryfikacji kodu 2FA' });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
