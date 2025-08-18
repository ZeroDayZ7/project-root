import logger from 'utils/logger.ts';
import { ServerConfig } from './types.js';

export function setupErrorHandlers(config: ServerConfig): void {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', {
      error: err.message,
      stack: err.stack,
      pid: process.pid,
    });
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', {
      reason: reason,
      promise: promise,
      pid: process.pid,
    });
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  });
}