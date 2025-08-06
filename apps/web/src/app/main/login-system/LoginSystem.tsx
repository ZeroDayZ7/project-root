'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useLogin } from './LoginContext';
import { Loader } from '@/components/ui/Loader';
import SystemDescription from './SystemDescription';
import LoginBoxHeader from './LoginBoxHeader';

const InitialStep = dynamic(() => import('./InitialStep'), {
  loading: () => <Loader aria-label="Ładowanie kroku logowania" />,
});

const EmailStep = dynamic(() => import('./EmailStep'), {
  loading: () => <Loader aria-label="Ładowanie kroku logowania" />,
});

const PasswordStep = dynamic(() => import('./PasswordStep'), {
  loading: () => <Loader aria-label="Ładowanie kroku logowania" />,
});

const TwoFactorStep = dynamic(() => import('./TwoFactorStep'), {
  loading: () => <Loader aria-label="Ładowanie kroku logowania" />,
});

const SuccessStep = dynamic(() => import('./SuccessStep'), {
  loading: () => <Loader aria-label="Ładowanie kroku logowania" />,
});

function LoginSystemContent() {
  const { loginStep } = useLogin();

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
        <LoginBoxHeader />
        <AnimatePresence mode="wait">
          <motion.div
            key={loginStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
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
      </motion.div>
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
