export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
}

export type LoginStep = 'step1' | 'step2' | 'step3' | 'success';