// src/config/env.ts
import { str, bool, num } from 'envalid';

export const COMMON_CONFIG = {  
  WEB_URL: str({ default: 'http://localhost:3000'}),
  GATEWAY_URL: str({ default: 'http://localhost:4000'}),
  AUTH_SERVICE_URL: str({ default: 'http://localhost:5000'}),
  USER_SERVICE_URL: str({ default: 'http://localhost:6000'}),

  SECRET_KEY: str({ default: '000000000000000000000000000000000000000000000000000000000000000' }),

  ENABLE_DEBUG: bool({ default: false }),
  APP_VERSION: str({ default: 'X.X.X' }),

  
  MAX_CONNECTIONS: num({ default: 1000 }),
  REQUEST_TIMEOUT: num({ default: 30000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
};