import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres email' }),
});

export const passwordSchema = z.object({
  password: z.string().min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
});

export const twoFactorSchema = z.object({
  twoFactorCode: z
    .string()
    .length(6, { message: 'Kod 2FA musi mieć dokładnie 6 cyfr' })
    .regex(/^\d+$/, { message: 'Kod 2FA musi zawierać tylko cyfry' }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type TwoFactorSchema = z.infer<typeof twoFactorSchema>;