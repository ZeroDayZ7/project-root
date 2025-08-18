// src/config/env.ts
import { COMMON_CONFIG, CommonEnv } from '@zerodayz7/common';
import { cleanEnv, str, port, num } from 'envalid';

type AuthEnv = CommonEnv & {
  CORS_EXPIRES: number;
  NAME: string;
  PORT: number;
};

const env: AuthEnv = cleanEnv(process.env, {
  ...COMMON_CONFIG,
  CORS_EXPIRES: num({ default: 86400 }),
  NAME: str({default: 'No Name'}),
  PORT: port({ default: 5000 }),
});

export default env;