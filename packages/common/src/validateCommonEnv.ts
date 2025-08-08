//env.ts
import { cleanEnv, str, port, num } from 'envalid';

export function validateCommonEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
    APP_VERSION: str({ default: 'unknown' }),
  });
}

export const env = cleanEnv(process.env, {
  PORT: port({ default: 4000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  APP_VERSION: str({ default: 'unknown' }),
});