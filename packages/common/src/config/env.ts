// src/config/env.ts
import { str, bool, num } from 'envalid';

// Typ wszystkich zmiennych środowiskowych
export interface CommonEnv {
  WEB_URL: string;
  GATEWAY_URL: string;
  AUTH_SERVICE_URL: string;
  USER_SERVICE_URL: string;

  SECRET_KEY: string;

  ENABLE_DEBUG: boolean;
  APP_VERSION: string;

  MAX_CONNECTIONS: number;
  REQUEST_TIMEOUT: number;
  NODE_ENV: 'development' | 'production' | 'test';
}

export const COMMON_CONFIG = {
  WEB_URL: str({ default: 'http://localhost:3000' }),
  GATEWAY_URL: str({ default: 'http://localhost:4000' }),
  AUTH_SERVICE_URL: str({ default: 'http://localhost:5000' }),
  USER_SERVICE_URL: str({ default: 'http://localhost:6000' }),

  SECRET_KEY: str({ default: '000000000000000000000000000000000000000000000000000000000000000' }),

  ENABLE_DEBUG: bool({ default: false }),
  APP_VERSION: str({ default: 'X.X.X' }),

  MAX_CONNECTIONS: num({ default: 1000 }),
  REQUEST_TIMEOUT: num({ default: 30000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
};
