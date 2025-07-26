'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCsrfToken } from './useCsrfToken';
import { passwordSchema, PasswordSchema } from './schemas';
import users from './users.json';

interface PasswordFormState {
  form: ReturnType<typeof useForm<PasswordSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  error: string | null;
  onSubmit: (password: string) => void;
  csrfTokenReady: boolean;
}

export function useLoginPassword(
  email: string,
  setStep: (step: '2fa' | 'email' | 'success') => void,
  setPassword: (password: string) => void
): PasswordFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError } = useCsrfToken();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: process.env.NODE_ENV === 'development' ? 'Password123!' : '',
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (password: string) => {
    if (!csrfToken || csrfError) {
      toast.error('Błąd tokenu CSRF. Odśwież stronę.');
      setError('Błąd tokenu CSRF.');
      return;
    }

    try {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Nieprawidłowe hasło.');
      }
      setError(null);
      setPassword(password);
      if (user.has2FA) {
        setStep('2fa');
        toast.info('Wymagane 2FA.');
      } else {
        setStep('success');
        toast.success('Zalogowano pomyślnie.');
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Logowanie nie powiodło się.');
    }
  };

  return {
    form,
    isSubmitting: form.formState.isSubmitting || isCsrfLoading,
    isLoading: isCsrfLoading,
    showPassword,
    toggleShowPassword,
    error,
    onSubmit,
    csrfTokenReady: !!csrfToken && !csrfError,
  };
}