// src/setupRoutes.ts
import { Application } from 'express';
import { logger, requestLoggerDev } from '@zerodayz7/common';
import routes from '../routes/index.ts';
import { healthRouter } from '@zerodayz7/common';
import env from '@/config/env.ts';

export function setupRoutes(app: Application) {
  logger.info('🛠️  Setting up routes...');
  app.use(
    requestLoggerDev({
      isDev: env.NODE_ENV === 'development',
    }),
  );

  // Health endpoint
  app.use('/health', healthRouter);
  // Główne API
  // app.use(routes);

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

}
