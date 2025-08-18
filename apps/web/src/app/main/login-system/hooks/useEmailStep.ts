'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useLogin } from '../LoginContext';
import { apiFetch } from '@/lib/apiFetch';
import logger from '@/utils/logger';
import { api } from '@/lib/http/httpClientInstance';
import { useAuth } from '@/context/AuthContext';

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
  const { csrfToken } = useAuth(); // zwraca aktualny CSRF token
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

interface Response {
  success: boolean;
}

// const onSubmit = async (data: EmailForm) => {
//   logger.info('[Email Step] Submitting email:', data.email);
//   try {
//     const res = await api.post<Response, { email: string }>(
//       '/api/auth/check-email',
//       { email: data.email },
//       { headers: { 'X-CSRF-Token': csrfToken ?? ''} } // dynamiczny CSRF
//     );

//     if (!res.success) {
//       setError('email', { message: 'Taki e-mail nie istnieje' });
//       return;
//     }

//     setEmail(data.email);
//     setUser({ email: data.email, has2FA: false });
//     setLoginStep('password');
//   } catch (error) {
//     logger.error('[Email check failed]', error);
//     setError('email', { message: 'Błąd podczas weryfikacji e-maila' });
//   }
// };

const onSubmit = async (data: EmailForm) => {
  logger.info('[Email Step] Submitting email:', data.email);
  logger.info('[Email Step] CSRF Token:', csrfToken);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000'}/api/auth/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': csrfToken ?? '',
      },
      body: JSON.stringify({ email: data.email }),
      credentials: 'include', // ważne: cookies polecą
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    const json: Response = await res.json();
    logger.info('[Email Step] Response:', json);

    if (!json.success) {
      setError('email', { message: 'Taki e-mail nie istnieje' });
      return;
    }

    setEmail(data.email);
    setUser({ email: data.email, has2FA: false });
    setLoginStep('password');
  } catch (error) {
    logger.error('[Email check failed]', error);
    setError('email', { message: 'Błąd podczas weryfikacji e-maila' });
  }
};


  return { register, handleSubmit, errors, isSubmitting, onSubmit };
}
