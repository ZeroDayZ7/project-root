// src/config/env.ts
import { COMMON_CONFIG } from '@zerodayz7/common';
import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  ...COMMON_CONFIG,
  NAME: str({default: 'No Name'}),
  PORT: port({ default: 5000 }),
});

export default env;