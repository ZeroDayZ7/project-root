import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  API_URL: str({ default: 'http://localhost:3000' }),
  SECRET_KEY: str(),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
});

export default env;
