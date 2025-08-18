'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useLogin } from './LoginContext';
import { useEffect, useRef, useState } from 'react';
import EmailStep from './components/EmailStep';
import PasswordStep from './components/PasswordStep';
import TwoFactorStep from './components/TwoFactorStep';
import SuccessStep from './components/SuccessStep';
import { useAuth } from '@/context/AuthContext';
import logger from '@/utils/logger';
import { api } from '@/lib/http/httpClientInstance';
import type { Session }  from '@/types/session';
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
  const { setCsrfToken } = useAuth();
  const { loginStep } = useLogin();
  const [height, setHeight] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);

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
  
  const handleHeightChange = (h: number) => setTargetHeight(h);

  useEffect(() => {
    if (targetHeight > 0) setHeight(targetHeight);
  }, [targetHeight]); 
  // ===== Animacje dla slide left/right =====
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };
  const [direction, setDirection] = useState(1); // 1 = next, -1 = back

  useEffect(() => {
    const initSession = async () => {
      try {
        const session = await api.get<Session>('/api/session-init');
        logger.info('Pobrano sesję:', session);
        setCsrfToken(session.csrfToken || '');
      } catch (error) {
        logger.error('Błąd pobierania sesji:', error);
      }
    };
    initSession();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-2" role="region" aria-labelledby="login-system-title">
      <motion.div style={{ height, overflow: 'hidden' }} animate={{ height }} transition={{ type: 'spring', stiffness: 1500, damping: 50 }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={loginStep} custom={direction} variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <StepWrapper key={loginStep} onHeightChange={handleHeightChange}>
              {StepComponent}
            </StepWrapper>
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
