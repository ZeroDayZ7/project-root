'use client';

import { LoginStep } from './types';
import { useAuth } from './AuthContext';

interface InitialStepHookReturn {
  handleStart: () => void;
}

export function useInitialStep(): InitialStepHookReturn {
  const { setLoginStep } = useAuth();

  const handleStart = () => {
    setLoginStep('email');
  };

  return { handleStart };
}
