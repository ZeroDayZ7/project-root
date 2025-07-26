'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useCsrfToken } from './useCsrfToken';
import { emailSchema, EmailSchema } from './schemas';
import users from './users.json';

interface EmailFormState {
  form: ReturnType<typeof useForm<EmailSchema>>;
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
  onSubmit: (email: string) => void;
  csrfTokenReady: boolean;
}

export function useLoginEmail(setStep: (step: 'password' | 'email') => void, setEmail: (email: string) => void): EmailFormState {
  const { csrfToken, isLoading: isCsrfLoading, error: csrfError } = useCsrfToken();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: process.env.NODE_ENV === 'development' ? 'user@example.com' : '',
    },
  });

  const onSubmit = (email: string) => {
    if (!csrfToken || csrfError) {
      toast.error('Błąd tokenu CSRF. Odśwież stronę.');
      setError('Błąd tokenu CSRF.');
      return;
    }

    try {
      const user = users.find((u) => u.email === email);
      if (!user) {
        throw new Error('Email nie istnieje w systemie.');
      }
      setError(null);
      setEmail(email);
      setStep('password');
      toast.success('Email zweryfikowany.');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || 'Weryfikacja emaila nie powiodła się.');
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