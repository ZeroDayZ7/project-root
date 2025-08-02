'use client';

import { Suspense, lazy, useState } from 'react';
import SystemDescription from './SystemDescription';
import { LoginStep } from './types';
import { validateEmail } from './utils';
import { Loader } from '@/components/Loader';

// Dynamiczne ładowanie komponentów kroków
const InitialStep = lazy(() => import('./InitialStep'));
const EmailStep = lazy(() => import('./EmailStep'));
const PasswordStep = lazy(() => import('./PasswordStep'));
const SuccessStep = lazy(() => import('./SuccessStep'));

export default function LoginSystem() {
  const [loginStep, setLoginStep] = useState<LoginStep>('initial');
  const [email, setEmail] = useState('test@test.pl');
  const [password, setPassword] = useState('ZZZ');
  const [isValidEmail, setIsValidEmail] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start">
      <SystemDescription />
      <div className="border border-foreground/30 rounded-lg p-6 w-full max-w-md">
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
          {loginStep === 'success' && <SuccessStep />}
        </Suspense>
      </div>
    </div>
  );
}
