// src/config/env.ts
import { cleanEnv, str, port, bool } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
  PORT: port({ default: 3000 }),
  JWT_SECRET: str(),
  DATABASE_URL: str(),
  ENABLE_DEBUG: bool({ default: false }),
});
