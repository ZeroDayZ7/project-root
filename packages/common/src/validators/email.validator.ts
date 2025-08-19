// login.validators.ts
import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email(),
});

export type EmailPayload = z.infer<typeof emailSchema>;
