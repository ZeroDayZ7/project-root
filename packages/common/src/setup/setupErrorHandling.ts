import { Application } from 'express';
import { notFoundHandler } from '../middleware/notFoundHandler.js';
import { globalErrorHandler } from '../middleware/globalErrorHandler.js';

export function setupErrorHandling(
  app: Application,
  config?: { serviceName?: string; isDev?: boolean; logger?: typeof console }
) {
  app.use(notFoundHandler(config?.serviceName));
  app.use(globalErrorHandler(config));
}
