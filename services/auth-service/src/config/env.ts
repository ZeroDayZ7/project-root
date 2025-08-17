// src/config/env.ts
import { COMMON_CONFIG, CommonEnv } from '@zerodayz7/common';
import { cleanEnv, str, port } from 'envalid';

type AuthEnv = CommonEnv & {
  NAME: string;
  PORT: number;
};

const env: AuthEnv = cleanEnv(process.env, {
  ...COMMON_CONFIG,
  NAME: str({default: 'No Name'}),
  PORT: port({ default: 5000 }),
});

export default env;