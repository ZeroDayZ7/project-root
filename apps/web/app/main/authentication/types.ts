export type LoginStep = 'email' | 'password' | '2fa' | 'success';

export interface LoginFlowProps {
  step: LoginStep;
  setStep: (step: LoginStep) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  twoFactorCode: string;
  setTwoFactorCode: (twoFactorCode: string) => void;
  error: string | null;
  csrfTokenReady: boolean;
}

export interface StepEmailProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (email: string) => void;
  error: string | null;
  isSubmitting: boolean;
  csrfTokenReady: boolean;
}

export interface StepPasswordProps {
  email: string;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (password: string) => void;
  error: string | null;
  isSubmitting: boolean;
  csrfTokenReady: boolean;
  onBack: () => void;
}

export interface Step2FAProps {
  email: string;
  twoFactorCode: string;
  setTwoFactorCode: (twoFactorCode: string) => void;
  onSubmit: (twoFactorCode: string) => void;
  error: string | null;
  isSubmitting: boolean;
  csrfTokenReady: boolean;
  onBack: () => void;
}