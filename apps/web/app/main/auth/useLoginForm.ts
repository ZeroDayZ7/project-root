'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCsrfToken } from '@/app/main/authentication/useCsrfToken';
import { loginSchema, LoginSchema } from './schemas';
import users from './users.json';

interface LoginFormState {
  form: ReturnType<typeof useForm<LoginSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  showConfirmPassword: boolean;
  toggleShowConfirmPassword: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  csrfTokenReady: boolean;
  error: string | null;
}

export function useLoginForm(): LoginFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError } = useCsrfToken();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'user@example.com' : '',
      password: process.env.NODE_ENV === 'development' ? 'Password123!' : '',
      confirmPassword: process.env.NODE_ENV === 'development' ? 'Password123!' : '',
    },
  });

  useEffect(() => {
    if (csrfError) {
      toast.error('Błąd tokenu CSRF.', {
        description: 'Odśwież stronę lub spróbuj później.',
        duration: 7000,
      });
    }
  }, [csrfError]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const onSubmit = async (data: LoginSchema) => {
    if (!csrfToken || csrfError) {
      toast.error('Brak tokenu CSRF. Odśwież stronę.');
      return;
    }

    try {
      const user = users.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (!user) {
        throw new Error('Nieprawidłowy email lub hasło.');
      }
      setError(null);
      toast.success('Zalogowano pomyślnie!');
      // Symulacja przekierowania
      setTimeout(() => {
        form.reset();
      }, 2000);
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
    showConfirmPassword,
    toggleShowConfirmPassword,
    onSubmit: form.handleSubmit(onSubmit),
    csrfTokenReady: !!csrfToken && !csrfError,
    error,
  };
}