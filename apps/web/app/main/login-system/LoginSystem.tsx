'use client';

import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import SystemDescription from './SystemDescription';
import { LoginStep } from './types';
import { Loader } from '@/components/ui/Loader';

const InitialStep = lazy(() => import('./InitialStep'));
const EmailStep = lazy(() => import('./EmailStep'));
const PasswordStep = lazy(() => import('./PasswordStep'));
const TwoFactorStep = lazy(() => import('./TwoFactorStep'));
const SuccessStep = lazy(() => import('./SuccessStep'));

export default function LoginSystem() {
  const [loginStep, setLoginStep] = useState<LoginStep>('initial');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('Password123!');
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start">
      <SystemDescription />
      <motion.div
        className="border border-foreground/30 rounded-lg p-6 w-full max-w-md min-h-[300px] max-h-[300px] flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-foreground">
            DOSTĘP DO SYSTEMU
          </h3>
          <div className="text-xs text-foreground/70 mt-2">
            Uwierzytelnianie wielopoziomowe aktywne
          </div>
        </div>
        <Suspense fallback={<Loader />}>
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
