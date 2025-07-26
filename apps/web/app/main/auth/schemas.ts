import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy adres email' }),
  password: z
    .string()
    .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Hasło musi mieć co najmniej 8 znaków' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła nie są identyczne',
  path: ['confirmPassword'],
});

export type LoginSchema = z.infer<typeof loginSchema>;