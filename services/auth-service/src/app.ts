import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import env from './config/env.js';
import logger from './utils/logger.js';

import { requestLoggerDev } from '@neo/common';


const app = express();
app.use(express.json()); // parsowanie JSON w body
if (process.env.NODE_ENV === 'development') {
  app.use(requestLoggerDev);
}

// app.use((req, res, next) => {
//   logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
//   next();
// });
 
// Middleware
// app.use(morgan('combined')); // logowanie requestów (opcjonalnie)

// Prosty endpoint, który zwraca losową odpowiedź
app.post('/check-email', (req, res) => {
  const { email } = req.body;

  // Prosta logika testowa:
  if (email === 'test@example.com') {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});


// Obsługa 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Obsługa błędów
app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error: %o', err);

  const status = err.status || 500;
  const isDev = env.NODE_ENV === 'development';

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }),
  });
});

export default app;
