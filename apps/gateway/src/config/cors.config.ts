import cors from 'cors';
import env from './env.js';

export const corsOptions: cors.CorsOptions = {
  origin: env.API_URL,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.CORS_EXPIRES || '86400', 10),
  optionsSuccessStatus: 200,
};
