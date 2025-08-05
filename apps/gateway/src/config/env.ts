import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  API_URL: str({ default: 'http://localhost:3000' }),
  SECRET_KEY: str(),
  PORT: port({ default: 4000 }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
});

export default env;
