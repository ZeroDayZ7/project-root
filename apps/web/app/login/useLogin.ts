'use client';

import { useState } from 'react';
import users from './users.json';
import { User, LoginStep } from './types';
import { loginStep1Schema, loginStep2Schema, loginStep3Schema } from './schema';
import { z } from 'zod';

export const useLogin = () => {
  const [step, setStep] = useState<LoginStep>('step1');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateStep1 = (data: { identifier: string }) => {
    const result = loginStep1Schema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message); // Change 'errors' to 'issues'
      return false;
    }

    const foundUser = users.find(
      (u: User) => u.email === data.identifier || u.username === data.identifier
    );
    if (!foundUser) {
      setError('User not found');
      return false;
    }

    setUser(foundUser);
    setError(null);
    setStep('step2');
    return true;
  };

  const validateStep2 = (data: { password: string }) => {
    const result = loginStep2Schema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message); // Change 'errors' to 'issues'
      return false;
    }

    if (!user || user.password !== data.password) {
      setError('Invalid password');
      return false;
    }

    setError(null);
    setStep(user.twoFactorEnabled ? 'step3' : 'success');
    return true;
  };

  const validateStep3 = (data: { totpCode: string }) => {
    const result = loginStep3Schema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message); // Change 'errors' to 'issues'
      return false;
    }

    // Symulacja weryfikacji TOTP (w rzeczywistości sprawdzane z secretem)
    if (data.totpCode !== '123456') {
      setError('Invalid TOTP code');
      return false;
    }

    setError(null);
    setStep('success');
    return true;
  };

  return { step, error, validateStep1, validateStep2, validateStep3 };
};