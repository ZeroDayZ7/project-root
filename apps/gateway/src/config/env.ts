// project-root\apps\gateway\src\config\env.js
import { cleanEnv, str, port, num } from 'envalid';

const env = cleanEnv(process.env, {
  API_URL: str({ default: 'http://localhost:3000' }),
  SECRET_KEY: str(),
  CORS_EXPIRES: num({ default: 86400 }),
  APP_VERSION: str({ default: 'X.X.X' }),
  // REDIS
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: 'admin' }),

  SESSION_COOKIE_NAME: str({ desc: 'Nazwa ciasteczka sesji', default: 'sid' }),
  SESSION_SECRET_KEY: str({ desc: 'Sekret sesji' }),
  SESSION_EXPIRES: num({ desc: 'Czas wygaśnięcia sesji (ms)', default: 15 * 60 * 1000 }),

  MAX_CONNECTIONS: num({ default: 1000 }),
  REQUEST_TIMEOUT: num({ default: 30000 }),
  
  NAME: str({default: 'No Name'}),
  PORT: port({ default: 4000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
});

export default env;
