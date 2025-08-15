'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useLogin } from '../LoginContext';
import { apiFetch } from '@/lib/apiFetch';
import logger from '@/utils/logger';

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną wielką literę')
    .regex(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę'),
});

type PasswordForm = z.infer<typeof passwordSchema>;

interface PasswordStepHookReturn {
  register: ReturnType<typeof useForm<PasswordForm>>['register'];
  handleSubmit: ReturnType<typeof useForm<PasswordForm>>['handleSubmit'];
  errors: ReturnType<typeof useForm<PasswordForm>>['formState']['errors'];
  isSubmitting: boolean;
  onSubmit: (data: PasswordForm) => Promise<void>;
}

export function usePasswordStep(): PasswordStepHookReturn {
  const { user, setLoginStep, setUser } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: 'Zaq1@wsx' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const onSubmit = async (data: PasswordForm) => {
    try {
      if (!user?.email) {
        setError('password', { message: 'Brak e-maila użytkownika. Wróć do kroku wprowadzania e-maila.' });
        return;
      }

      const res = await apiFetch('/api/auth/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: data.password }),
      });

      if (!res.ok) {
        throw new Error(`Błąd serwera: ${res.status}`);
      }

      const result = await res.json();
      logger.info(`[usePasswordStep] result: ${JSON.stringify(result), null, 2}`);
      if (!result.success) {
        setError('password', { message: result.message || 'Nieprawidłowe hasło' });
        return;
      }

      setUser({
        email: user.email,
        has2FA: result.has2FA as boolean,
      });
      logger.info(`[usePasswordStep] result: ${JSON.stringify(result, null, 2)}`);
      logger.info(`[usePasswordStep] user: ${JSON.stringify(user)}`);

      setLoginStep(result.has2FA ? 'twoFactor' : 'success');
    } catch (error: any) {
      logger.error('[Password check failed]', {
        message: error.message,
        stack: error.stack,
      });
      const errorMessage = error.message.includes('Failed to fetch') ? 'Błąd sieci. Sprawdź połączenie internetowe.' : 'Błąd podczas weryfikacji hasła';
      setError('password', { message: errorMessage });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
