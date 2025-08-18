import env from './env.js';

export const corsOptions = {
  origin: env.WEB_URL || '*', // Allow all origins by default, can be overridden in production
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['Content-Length'],
  maxAge: env.CORS_EXPIRES,
  optionsSuccessStatus: 200,
};
