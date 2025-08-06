import env from './env.js';

export const corsOptions = {
  origin: env.API_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: env.CORS_EXPIRES,
  optionsSuccessStatus: 200,
};
