'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import SystemDescription from './SystemDescription';
import { useLoginSystem } from './useLoginSystem';
import { Loader } from '@/components/ui/Loader';

const InitialStep = lazy(() => import('./InitialStep'));
const EmailStep = lazy(() => import('./EmailStep'));
const PasswordStep = lazy(() => import('./PasswordStep'));
const TwoFactorStep = lazy(() => import('./TwoFactorStep'));
const SuccessStep = lazy(() => import('./SuccessStep'));

export default function LoginSystem() {
  const {
    loginStep,
    email,
    password,
    csrfToken,
    isLoading,
    error,
    setLoginStep,
    setEmail,
    setPassword,
    setIsValidEmail,
    resetLogin
  } = useLoginSystem();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader aria-label="Ładowanie systemu logowania" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-red-500" role="alert">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <SystemDescription />
      <motion.div
        className="w-full max-w-md rounded-lg border border-foreground/30 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="region"
        aria-labelledby="login-system-title"
      >
        <div className="mb-6 text-center">
          <h3
            id="login-system-title"
            className="text-lg font-bold text-foreground"
          >
            Dostęp do systemu
          </h3>
          <p className="mt-2 text-xs text-foreground/70">
            Uwierzytelnianie wielopoziomowe aktywne
          </p>
          <p>
            <button onClick={resetLogin}>Resetuj logowanie</button>
          </p>
        </div>
        <Suspense fallback={<Loader aria-label="Ładowanie kroku logowania" />}>
          {loginStep === 'initial' && (
            <InitialStep setLoginStep={setLoginStep} />
          )}
          {loginStep === 'email' && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              setIsValidEmail={setIsValidEmail}
              setLoginStep={setLoginStep}
            />
          )}
          {loginStep === 'password' && (
            <PasswordStep
              email={email}
              password={password}
              setPassword={setPassword}
              setLoginStep={setLoginStep}
              csrfToken={csrfToken}
            />
          )}
          {loginStep === 'twoFactor' && (
            <TwoFactorStep email={email} setLoginStep={setLoginStep} />
          )}
          {loginStep === 'success' && <SuccessStep />}
        </Suspense>
      </motion.div>
    </div>
  );
}
