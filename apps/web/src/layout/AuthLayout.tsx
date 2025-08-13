// components/layout/AuthLayout.tsx
'use client';

import { useAuth } from '@/context/AuthContext'; // Upewnij się, że ścieżka jest poprawna
import { SplashLoader } from '@neo/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  // Pobieramy stan inicjalizacji z naszego hooka
  const { isInitializing } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {isInitializing ? (
        // Klucz jest ważny dla AnimatePresence, aby wiedział co animować
        <motion.div key="loader" exit={{ opacity: 0 }}>
          <SplashLoader />
        </motion.div>
      ) : (
        // Po zakończeniu ładowania, płynnie pokaż zawartość
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}