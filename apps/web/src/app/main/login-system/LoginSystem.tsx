'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './AuthContext';
import InitialStep from './InitialStep';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import TwoFactorStep from './TwoFactorStep';
import SuccessStep from './SuccessStep';
import { Loader } from '@/components/ui/Loader';
import { LoginStep } from './types';

function LoginSystemContent() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { loginStep, resetLogin } = useAuth();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [loginStep]);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="border border-foreground/30 rounded-lg p-6 mb-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-accent-foreground mb-4 text-center">
          SYSTEM KASANDRA
        </h2>
        <div className="text-sm text-card-foreground space-y-2 text-center">
          <p>Strategiczne Centrum Bezpieczeństwa</p>
          <p className="text-xs text-foreground/70">
            Zaawansowany system monitorowania i analizy zagrożeń.
          </p>
        </div>
      </div>
      <motion.div
        className="w-full max-w-md rounded-lg border border-foreground/30 p-6 min-h-[300px]"
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
            <button
              onClick={resetLogin}
              className="text-sm text-foreground/70 hover:text-foreground"
            >
              Resetuj logowanie
            </button>
          </p>
        </div>
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center items-center min-h-[150px]"
            >
              <Loader aria-label="Ładowanie kroku logowania" />
            </motion.div>
          ) : (
            <motion.div
              key={loginStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {loginStep === 'initial' && <InitialStep />}
              {loginStep === 'email' && <EmailStep />}
              {loginStep === 'password' && <PasswordStep />}
              {loginStep === 'twoFactor' && <TwoFactorStep />}
              {loginStep === 'success' && <SuccessStep />}
            </motion.div>
          )}
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
