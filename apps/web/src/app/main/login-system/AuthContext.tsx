'use client';

import { createContext, useContext, useState } from 'react';
import { LoginStep } from './types';

interface AuthContextType {
  loginStep: LoginStep;
  email: string;
  user: { email: string; has2FA: boolean } | null;
  setLoginStep: (step: LoginStep) => void;
  setEmail: (email: string) => void;
  setUser: (user: { email: string; has2FA: boolean } | null) => void;
  resetLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loginStep, setLoginStep] = useState<LoginStep>('initial');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<{ email: string; has2FA: boolean } | null>(
    null,
  );

  function resetLogin() {
    setLoginStep('initial');
    setEmail('');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loginStep,
        email,
        user,
        setLoginStep,
        setEmail,
        setUser,
        resetLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
