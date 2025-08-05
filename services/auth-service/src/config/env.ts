// src/config/env.ts
import { cleanEnv, str, port, bool } from 'envalid';

const env = cleanEnv(process.env, {  
  JWT_SECRET: str(),
  DATABASE_URL: str(),
  ENABLE_DEBUG: bool({ default: false }),
  PORT: port({ default: 5000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
});

export default env;