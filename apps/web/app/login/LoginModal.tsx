'use client';

import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@neo/ui';
import { LoginStep1 } from './LoginStep1';
import { LoginStep2 } from './LoginStep2';
import { LoginStep3 } from './LoginStep3';
import { useLogin } from './useLogin';
import { Alert, AlertDescription } from '@neo/ui';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { step, error, validateStep1, validateStep2, validateStep3 } = useLogin();

  // Debug: Śledzenie zmiany isOpen
  useEffect(() => {
    console.log('LoginModal: isOpen changed to:', isOpen);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Zaloguj się, podając swoje dane uwierzytelniające.</DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {step === 'step1' && <LoginStep1 onSubmit={validateStep1} />}
        {step === 'step2' && <LoginStep2 onSubmit={validateStep2} />}
        {step === 'step3' && <LoginStep3 onSubmit={validateStep3} />}
        {step === 'success' && (
          <div className="text-center">
            <p className="text-green-600">Zalogowano pomyślnie!</p>
            <button onClick={onClose} className="mt-4 text-sm text-blue-600">
              Zamknij
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};