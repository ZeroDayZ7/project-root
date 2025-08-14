'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useLogin } from './LoginContext';
import { InlineLoader } from '@neo/ui';
import { Loader } from '@/components/ui/Loader';
import { useEffect, useRef, useState } from 'react';

const EmailStep = dynamic(() => import('./EmailStep.tsx').then((mod) => mod.default), { loading: () => <Loader />, ssr: false });
const PasswordStep = dynamic(() => import('./PasswordStep.tsx').then((mod) => mod.default), { loading: () => <InlineLoader />, ssr: false });
const TwoFactorStep = dynamic(() => import('./TwoFactorStep.tsx').then((mod) => mod.default), { loading: () => <InlineLoader />, ssr: false });
const SuccessStep = dynamic(() => import('./SuccessStep.tsx').then((mod) => mod.default), { loading: () => <InlineLoader />, ssr: false });

function StepWrapper({ children, onHeightChange }: { children: React.ReactNode; onHeightChange: (h: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(() => {
      if (ref.current) onHeightChange(ref.current.offsetHeight);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [children, onHeightChange]);

  return <div ref={ref}>{children}</div>;
}

function LoginSystemContent() {
  const { loginStep } = useLogin();
  const [height, setHeight] = useState(0);           // aktualna wysokość animowana
  const [targetHeight, setTargetHeight] = useState(0); // wysokość nowego kroku dopiero po załadowaniu

  const StepComponent = (() => {
    switch (loginStep) {
      case 'email':
        return <EmailStep key="email" />;
      case 'password':
        return <PasswordStep key="password" />;
      case 'twoFactor':
        return <TwoFactorStep key="twoFactor" />;
      case 'success':
        return <SuccessStep key="success" />;
      default:
        return null;
    }
  })();

  // callback z StepWrapper
  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
  };

  // synchronizujemy height dopiero gdy targetHeight się zmieni
  useEffect(() => {
    if (targetHeight > 0) {
      setHeight(targetHeight);
    }
  }, [targetHeight]);

  return (
    <div className="w-full max-w-md mx-auto p-2" role="region" aria-labelledby="login-system-title">
      <motion.div
        style={{ height, overflow: 'hidden' }}
        animate={{ height }}
        transition={{ type: 'spring', stiffness: 135, damping: 40 }}
      >
        <AnimatePresence mode="wait">
          <StepWrapper key={loginStep} onHeightChange={handleHeightChange}>
            {StepComponent}
          </StepWrapper>
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
