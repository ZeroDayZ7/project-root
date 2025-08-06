'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { LoginStep } from './types';
import { useLogin } from './LoginContext';

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
  const { user, setLoginStep } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setFocus,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  const onSubmit = async (data: PasswordForm) => {
    try {
      const res = await fetch('/api/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, password: data.password }),
      });

      if (!res.ok) {
        throw new Error('Błąd serwera przy sprawdzaniu hasła');
      }

      const result = await res.json();
      if (!result.valid) {
        setError('password', { message: 'Nieprawidłowe hasło' });
        return;
      }

      setLoginStep(user?.has2FA ? 'twoFactor' : 'success');
    } catch (error) {
      console.error('[Password check failed]', error);
      setError('password', { message: 'Błąd podczas weryfikacji hasła' });
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
