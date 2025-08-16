// src/config/env.ts
import { str, bool, num } from 'envalid';

export const COMMON_CONFIG = {  
  WEB_URL: str({ default: 'xxx'}),
  GATEWAY_URL: str({ default: 'xxx'}),
  USERSERVICE_URL: str({ default: 'xxx'}),

  SECRET_KEY: str({ default: 'xyz' }),

  ENABLE_DEBUG: bool({ default: false }),
  APP_VERSION: str({ default: 'X.X.X' }),

  
  MAX_CONNECTIONS: num({ default: 1000 }),
  REQUEST_TIMEOUT: num({ default: 30000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
};