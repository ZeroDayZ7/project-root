// src/setupRoutes.ts
import { Application } from 'express';
import { uuidv4 } from '@zerodayz7/common';
import routes from '../routes/index.ts';
import { healthRouter } from '@zerodayz7/common';
import env from '@/config/env.ts';

export function setupRoutes(app: Application) {
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

}
