// MainPage.tsx
'use client';

import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SystemStatus } from './SystemStatus';
import { AppBrand } from '@/components/AppBrand';
import { ThemeToggleKasandra } from '@neo/ui';

const MainPage = () => {
  const [loginStep, setLoginStep] = useState<'initial' | 'email' | 'password' | 'success'>('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email validation function
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handlers for login steps
  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setLoginStep('password');
    }
  };

  const handlePasswordSubmit = () => {
    if (password.length > 0) {
      setLoginStep('success');
    }
  };

  return (
    <>
      <ThemeToggleKasandra />
      <AppBrand />
      <LoginForm
        loginStep={loginStep}
        setLoginStep={setLoginStep}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        validateEmail={validateEmail}
        handleEmailSubmit={handleEmailSubmit}
        handlePasswordSubmit={handlePasswordSubmit}
      />
      <SystemStatus />
    </>
  );
};

export default MainPage;
