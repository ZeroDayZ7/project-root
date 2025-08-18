// src/setupRoutes.ts
import { Application } from 'express';
import { logger, requestLoggerDev, uuidv4 } from '@zerodayz7/common';
import routes from '../routes/index.ts';
import { healthRouter } from '@zerodayz7/common';
import env from '@/config/env.ts';

export function setupRoutes(app: Application) {
  app.use(
    requestLoggerDev({
      isDev: env.NODE_ENV === 'development',
    }),
  );

app.use((req, res, next) => {
  const _send = res.send;
  res.send = function (body) {
    console.log('Response headers:', res.getHeaders());
    return _send.call(this, body);
  };
  next();
});


  // Global middleware
  app.use((req, res, next) => {
    const requestId = uuidv4();
    req.headers['X-Request-ID'] = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  });

  // Health endpoint
  app.use('/health', healthRouter);

  // Główne API
  app.use('/api', routes);

  // logger.info(`WEB URL${env.WEB_URL}`)
}
