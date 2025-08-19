// validators/register.validators.ts
import { z } from 'zod';
import { passwordSchema } from './config.js';

export const checkPasswordSchema = z.object({
  password: passwordSchema,
});

export type PasswordPayload = z.infer<typeof checkPasswordSchema>;
