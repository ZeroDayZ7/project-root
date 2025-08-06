'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useLogin } from './LoginContext';
import { apiFetch } from '@/lib/apiFetch';
import logger from '@/utils/logger';

const emailSchema = z.object({
  email: z.string().email('Podaj prawidłowy adres e-mail'),
});

type EmailForm = z.infer<typeof emailSchema>;

interface EmailStepHookReturn {
  register: ReturnType<typeof useForm<EmailForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<EmailForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<EmailForm>>['formState']['errors'];
  isSubmitting: boolean;
  onSubmit: (data: EmailForm) => Promise<void>;
}

export function useEmailStep(): EmailStepHookReturn {
  const { setLoginStep, setEmail, setUser } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: 'test@example.com' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (data: EmailForm) => {
    try {
      // const res = await apiFetch('/check-email', {
      const res = await fetch('http://localhost:4000/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        throw new Error('Błąd serwera przy sprawdzaniu e-maila');
      }

      const result = await res.json();
      logger.info(`result: ${JSON.stringify(result, null, 2)}`);
      if (!result.success) {
        setError('email', { message: 'Taki e-mail nie istnieje' });
        return;
      }
      
      setEmail(data.email);
      setUser({ email: data.email, has2FA: false });
      setLoginStep('password');
    } catch (error) {
      logger.error('[Email check failed]', error);
      setError('email', { message: 'Błąd podczas weryfikacji e-maila' });
    } finally {
      //  console.error('[Email check failed]', error);
      // setError('email', { message: 'Błąd podczas weryfikacji e-maila' });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
