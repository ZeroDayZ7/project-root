export type LoginStep = 'initial' | 'email' | 'password' | 'confirm-password' | 'success';

export interface LoginFormProps {
  loginStep: LoginStep;
  setLoginStep: (step: LoginStep) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  validateEmail: (email: string) => boolean;
  handleEmailSubmit: () => void;
  handlePasswordSubmit: () => void;
  handleConfirmPasswordSubmit: () => void;
}