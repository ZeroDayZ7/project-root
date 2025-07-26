'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@neo/ui';
import { Button } from '@neo/ui';
import { useTranslations } from 'next-intl';
import { StepEmail } from './StepEmail';
import { StepPassword } from './StepPassword';
import { Step2FA } from './Step2FA';
import { useLoginEmail } from './useLoginEmail';
import { useLoginPassword } from './useLoginPassword';
import { useLogin2FA } from './useLogin2FA';
import { LoginStep } from './types';

export function LoginFlow() {
  const t = useTranslations('LoginPage');
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const emailHook = useLoginEmail(setStep, setEmail);
  const passwordHook = useLoginPassword(email, setStep, setPassword);
  const twoFactorHook = useLogin2FA(email, setStep, setTwoFactorCode);

  return (
    <Card className="w-full max-w-sm shadow-lg border-none bg-white/90 backdrop-blur-sm">
      <CardHeader className="flex flex-col items-center space-y-2">
        <div className="text-2xl font-bold text-blue-600">MyApp</div>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {t('loginTitle')}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {t('loginDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {step === 'email' && (
          <StepEmail
            email={email}
            setEmail={setEmail}
            onSubmit={emailHook.onSubmit}
            error={emailHook.error}
            isSubmitting={emailHook.isSubmitting}
            csrfTokenReady={emailHook.csrfTokenReady}
          />
        )}
        {step === 'password' && (
          <StepPassword
            email={email}
            password={password}
            setPassword={setPassword}
            onSubmit={passwordHook.onSubmit}
            error={passwordHook.error}
            isSubmitting={passwordHook.isSubmitting}
            csrfTokenReady={passwordHook.csrfTokenReady}
            onBack={() => setStep('email')}
          />
        )}
        {step === '2fa' && (
          <Step2FA
            email={email}
            twoFactorCode={twoFactorCode}
            setTwoFactorCode={setTwoFactorCode}
            onSubmit={twoFactorHook.onSubmit}
            error={twoFactorHook.error}
            isSubmitting={twoFactorHook.isSubmitting}
            csrfTokenReady={twoFactorHook.csrfTokenReady}
            onBack={() => setStep('password')}
          />
        )}
        {step === 'success' && (
          <div className="text-center space-y-4 text-blue-500">
            <div className="text-lg font-semibold">✅ {t('success')}</div>
            <div className="text-sm">{t('redirecting')}</div>
            <div className="animate-pulse">{t('loading')}</div>
            <Button
              variant="link"
              className="w-full text-sm text-blue-500"
              onClick={() => {
                setStep('email');
                setEmail('');
                setPassword('');
                setTwoFactorCode('');
              }}
            >
              {t('back')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}