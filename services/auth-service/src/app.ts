import express from 'express';
import env from './config/env.js';
import { globalErrorHandler, logger, notFoundHandler, setupCommonMiddleware } from '@zerodayz7/common';

import { requestLoggerDev } from '@zerodayz7/common';
import router from './routes/index.ts';

const app = setupCommonMiddleware();
app.use(express.json({ limit: '1mb' })); 
app.use(
  requestLoggerDev({
    logger,
    isDev: env.NODE_ENV === 'development',
  }),
);
// app.use(router);

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

app.post('/check-2fa', (req, res) => {
  const { email, code } = req.body;
  logger.info(`Sprawdzanie 2FA dla ${email} z kodem ${code}`);

  if (email === 'test@example.com' && code === '123456') {
    return res.json({
      success: true,
      isLoggedIn: true,
    });
  } else {
    return res.json({ success: false });
  }
});

// Obsługa 404
app.use(
  notFoundHandler({
    serviceName: env.NAME,
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);

// Obsługa błędów
app.use(
  globalErrorHandler({
    serviceName: env.NAME,
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);

export default app;
