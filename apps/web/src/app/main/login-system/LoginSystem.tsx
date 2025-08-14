'use client';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useLogin } from './LoginContext';
import { InlineLoader } from '@neo/ui';
import { Loader } from '@/components/ui/Loader';
import EmailStep from './components/EmailStep';
import PasswordStep from './components/PasswordStep';
import TwoFactorStep from './components/TwoFactorStep';
import SuccessStep from './components/SuccessStep';

function LoginSystemContent() {
  const { loginStep } = useLogin();

  const getStepComponent = () => {
    switch (loginStep) {
      case 'email': return <EmailStep />;
      case 'password': return <PasswordStep />;
      case 'twoFactor': return <TwoFactorStep />;
      case 'success': return <SuccessStep />;
      default: return null;
    }
  };

return (
    <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            className='w-full max-w-md'
            key={loginStep}
            initial={{ opacity: 0, filter: "blur(4px)", rotateX: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", rotateX: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)", rotateX: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {getStepComponent()}
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