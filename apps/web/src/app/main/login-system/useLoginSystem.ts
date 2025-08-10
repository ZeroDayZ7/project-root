'use client';

import { useState } from 'react';
import { LoginStep } from './types';
import { useCsrfToken } from '@/services/useCsrfToken';

export interface LoginSystemState {
  loginStep: LoginStep;
  email: string;
  password: string;
  isValidEmail: boolean;
  csrfToken: string | null;
  isLoading: boolean;
  error: string | null;
  setLoginStep: (step: LoginStep) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsValidEmail: (isValid: boolean) => void;
  resetLogin: () => void; // <-- dodajemy tu
}

export function useLoginSystem(): LoginSystemState {
  const [loginStep, setLoginStep] = useState<LoginStep>('initial');
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('Zaq1@wsx');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { csrfToken, isLoading, error } = useCsrfToken();

  function resetLogin() {
    setLoginStep('initial');
    setEmail('');
    setPassword('');
    setIsValidEmail(false);
    // csrfToken, isLoading, error - nie zmieniamy bo to z hooka useCsrfToken
  }

  return {
    loginStep,
    email,
    password,
    isValidEmail,
    csrfToken,
    isLoading,
    error,
    setLoginStep,
    setEmail,
    setPassword,
    setIsValidEmail,
    resetLogin, // <-- zwracamy funkcję
  };
}
