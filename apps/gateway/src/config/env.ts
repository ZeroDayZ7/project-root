// project-root\apps\gateway\src\config\env.js
import 'dotenv/config';
import { COMMON_CONFIG, CommonEnv, logger } from '@zerodayz7/common';
import { cleanEnv, str, port, num } from 'envalid';

type GatewayEnv = CommonEnv & {
  CORS_EXPIRES: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  SESSION_COOKIE_NAME: string;
  SESSION_SECRET_KEY: string;
  SESSION_EXPIRES: number;
  NAME: string;
  PORT: number;
};

const env: GatewayEnv = cleanEnv(process.env, {
  ...COMMON_CONFIG,
  CORS_EXPIRES: num({ default: 86400 }),
  // REDIS
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: 'admin' }),
  // SESSION
  SESSION_COOKIE_NAME: str({ desc: 'Nazwa ciasteczka sesji', default: 'sid' }),
  SESSION_SECRET_KEY: str({ desc: 'Sekret sesji' }),
  SESSION_EXPIRES: num({ desc: 'Czas wygaśnięcia sesji (ms)', default: 15 * 60 * 1000 }),
  
  NAME: str({default: 'No Name'}),
  PORT: port({ default: 4000 }),
});

export default env;
 