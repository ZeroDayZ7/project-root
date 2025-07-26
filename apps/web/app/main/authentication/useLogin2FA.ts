'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCsrfToken } from './useCsrfToken';
import { twoFactorSchema, TwoFactorSchema } from './schemas';
import users from './users.json';

interface TwoFAFormState {
  form: ReturnType<typeof useForm<TwoFactorSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
  onSubmit: (twoFactorCode: string) => void;
  csrfTokenReady: boolean;
}

export function useLogin2FA(
  email: string,
  setStep: (step: 'success' | 'password') => void,
  setTwoFactorCode: (code: string) => void
): TwoFAFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError } = useCsrfToken();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TwoFactorSchema>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      twoFactorCode: process.env.NODE_ENV === 'development' ? '123456' : '',
    },
  });

  const onSubmit = (twoFactorCode: string) => {
    if (!csrfToken || csrfError) {
      toast.error('Błąd tokenu CSRF. Odśwież stronę.');
      setError('Błąd tokenu CSRF.');
      return;
    }

    try {
      const user = users.find((u) => u.email === email && u.twoFactorCode === twoFactorCode);
      if (!user) {
        throw new Error('Nieprawidłowy kod 2FA.');
      }
      setError(null);
      setTwoFactorCode(twoFactorCode);
      setStep('success');
      toast.success('Zalogowano pomyślnie.');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Weryfikacja 2FA nie powiodła się.');
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isCsrfLoading,
    isLoading: isCsrfLoading,
    error,
    onSubmit,
    csrfTokenReady: !!csrfToken && !csrfError,
  };
}