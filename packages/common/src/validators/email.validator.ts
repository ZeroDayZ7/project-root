// login.validators.ts
import { z } from 'zod';
import { emailSchema } from './config.ts';

export const checkEmailSchema = z.object({
  email: emailSchema,
});

export type EmailPayload = z.infer<typeof checkEmailSchema>;
