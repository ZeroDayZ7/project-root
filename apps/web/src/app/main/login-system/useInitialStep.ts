'use client';

import { LoginStep } from './types';

interface InitialStepHookProps {
  setLoginStep: (step: LoginStep) => void;
}

interface InitialStepHookReturn {
  handleStart: () => void;
}

export function useInitialStep({
  setLoginStep,
}: InitialStepHookProps): InitialStepHookReturn {
  const handleStart = () => {
    setLoginStep('email');
  };

  return { handleStart };
}
