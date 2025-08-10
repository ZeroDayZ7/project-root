'use client';

import { useLogin } from './LoginContext';

interface InitialStepHookReturn {
  handleStart: () => void;
}

export function useInitialStep(): InitialStepHookReturn {
  const { setLoginStep } = useLogin();

  const handleStart = () => {
    setLoginStep('email');
  };

  return { handleStart };
}
