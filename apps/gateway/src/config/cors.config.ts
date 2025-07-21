import cors from 'cors';

export const corsOptions: cors.CorsOptions = {
  origin: process.env.API_URL || '*',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: parseInt(process.env.CORS_EXPIRES || '86400', 10),
  optionsSuccessStatus: 200,
};
