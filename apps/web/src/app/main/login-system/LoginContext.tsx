'use client';

import { createContext, useContext, useState } from 'react';
import { LoginStep } from './types';

interface LoginContextType {
  loginStep: LoginStep;
  email: string;
  user: { email: string; has2FA: boolean } | null;
  setLoginStep: (step: LoginStep) => void;
  setEmail: (email: string) => void;
  setUser: (user: { email: string; has2FA: boolean } | null) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loginStep, setLoginStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<{ email: string; has2FA: boolean } | null>(
    null,
  );

  return (
    <LoginContext.Provider
      value={{
        loginStep,
        email,
        user,
        setLoginStep,
        setEmail,
        setUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
