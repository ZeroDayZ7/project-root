import { cleanEnv, str, port, num } from 'envalid';

const env = cleanEnv(process.env, {
  API_URL: str({ default: 'http://localhost:3000' }),
  SECRET_KEY: str(),
  CORS_EXPIRES: num({ default: 86400 }),
  APP_VERSION: str({ default: 'X.X.X' }),
  PORT: port({ default: 4000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
});

export default env;
