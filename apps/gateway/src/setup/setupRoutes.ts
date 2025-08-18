// src/setupRoutes.ts
import { Application } from 'express';
import express from 'express';
import { logger, requestLoggerDev, uuidv4 } from '@zerodayz7/common';
import routes from '../routes/index.ts';
import { healthRouter } from '@zerodayz7/common';
import env from '@/config/env.ts';

export function setupRoutes(app: Application) {
  logger.info('🛠️  Setting up routes...');
  // app.use(
  //   requestLoggerDev({
  //     isDev: env.NODE_ENV === 'development',
  //   }),
  // );
  
  // Health endpoint
  app.use('/health', healthRouter);

  // Główne API
  app.use('/api', routes);

}
