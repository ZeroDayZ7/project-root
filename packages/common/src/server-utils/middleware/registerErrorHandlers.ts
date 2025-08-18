// common/src/errors/registerErrorHandlers.ts
import { Application } from 'express';
import { notFoundHandler } from './notFoundHandler.js';
import { globalErrorHandler } from './globalErrorHandler.js';

export function registerErrorHandlers(
  app: Application,
  opts?: { serviceName?: string; isDev?: boolean }
) {
  // 404 musi być przed globalnym error handlerem
  app.use(notFoundHandler(opts));
  app.use(globalErrorHandler(opts));
}
