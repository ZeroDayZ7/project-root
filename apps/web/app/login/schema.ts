import { z } from 'zod';

export const loginStep1Schema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
});

export const loginStep2Schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginStep3Schema = z.object({
  totpCode: z.string().length(6, 'TOTP code must be 6 digits'),
});

export type LoginStep1Form = z.infer<typeof loginStep1Schema>;
export type LoginStep2Form = z.infer<typeof loginStep2Schema>;
export type LoginStep3Form = z.infer<typeof loginStep3Schema>;