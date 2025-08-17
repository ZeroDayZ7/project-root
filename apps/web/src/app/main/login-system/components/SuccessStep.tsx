//   SuccessStep.tsx
'use client';

import { Loader } from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLogin } from '../LoginContext';

export default function SuccessStep() {
  const router = useRouter();
  const { user } = useLogin();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (user) {
      timeout = setTimeout(() => {
      router.replace('/main/dashboard'); 
      }, 700); // 700 ms delay
    }
    return () => clearTimeout(timeout);
  }, [user, router]);

  return (
    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-foreground text-lg">✅ DOSTĘP AUTORYZOWANY</div>
      <div className="text-sm text-foreground/70">
        Przekierowanie do panelu głównego...
      </div>
      <Loader message="ŁADOWANIE INTERFEJSU..." />
    </motion.div>
  );
}
