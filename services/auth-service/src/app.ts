import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import env from './config/env.js';
import { logger } from '@neo/common';

import { requestLoggerDev } from '@neo/common';


const app = express();
// wyłączenie X-Powered-By
app.disable('x-powered-by');
app.use(express.json()); // parsowanie JSON w body
app.use(
  requestLoggerDev({
    logger,
    isDev: env.NODE_ENV === 'development',
  })
);
 
// Prosty endpoint, który zwraca losową odpowiedź
app.post('/check-email', (req, res) => {
  const { email } = req.body;

  // Prosta logika testowa:
  if (email === 'test@example.com') {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

app.post('/check-password', (req, res) => {
  const { email, password } = req.body;

  // Prosta logika testowa:
  if (email === 'test@example.com' && password === 'Zaq1@wsx') {
    return res.json({
      success: true,
      has2FA: true, // ustawiasz true, żeby wymusić 2FA dla testów
    });
  } else {
    return res.json({ success: false });
  }
});


// Obsługa 404
app.use((req, res, next) => {
  res.status(404).json({ message: '[Auth-Service] Not Found' });
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
