// src/setup/setupErrorHandlers.ts
import { Application } from 'express';
import { notFoundHandler, globalErrorHandler } from '@zerodayz7/common';
import env from '../config/env.js';
import { logger } from '@zerodayz7/common';

// Obsługa błędów
export function setupErrorHandlers(app: Application) {
  app.use(notFoundHandler({ serviceName: 'gateway', isDev: env.NODE_ENV === 'development', logger }));
  app.use(globalErrorHandler({ serviceName: 'gateway', isDev: env.NODE_ENV === 'development', logger }));
}
