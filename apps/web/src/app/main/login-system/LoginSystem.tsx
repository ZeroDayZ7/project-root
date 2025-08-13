'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useLogin } from './LoginContext';
import { InlineLoader } from '@neo/ui';
import LoginBoxHeader from './LoginBoxHeader';

const InitialStep = dynamic(() => import('./InitialStep.tsx').then((mod) => mod.default), {
  loading: () => <InlineLoader aria-label="Ładowanie kroku logowania" />,
  ssr: false,
});

const EmailStep = dynamic(() => import('./EmailStep.tsx').then((mod) => mod.default), {
  loading: () => <InlineLoader aria-label="Ładowanie kroku logowania" />,
  ssr: false,
});

const PasswordStep = dynamic(() => import('./PasswordStep.tsx').then((mod) => mod.default), {
  loading: () => <InlineLoader aria-label="Ładowanie kroku logowania" />,
});

const TwoFactorStep = dynamic(() => import('./TwoFactorStep.tsx').then((mod) => mod.default), {
  loading: () => <InlineLoader aria-label="Ładowanie kroku logowania" />,
});

const SuccessStep = dynamic(() => import('./SuccessStep.tsx').then((mod) => mod.default), {
  loading: () => <InlineLoader aria-label="Ładowanie kroku logowania" />,
});

function LoginSystemContent() {
  const { loginStep } = useLogin();

  return (
    <div className="w-full max-w-md rounded-lg border border-foreground/30 p-6" role="region" aria-labelledby="login-system-title">
      <LoginBoxHeader />
      <AnimatePresence mode="wait">
        <motion.div
          key={loginStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          layout
          style={{ overflow: 'hidden' }}
        >
          {loginStep === 'initial' && <InitialStep />}
          {loginStep === 'email' && <EmailStep />}
          {loginStep === 'password' && <PasswordStep />}
          {loginStep === 'twoFactor' && <TwoFactorStep />}
          {loginStep === 'success' && <SuccessStep />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function LoginSystem() {
  return (
    <AuthProvider>
      <LoginSystemContent />
    </AuthProvider>
  );
}
