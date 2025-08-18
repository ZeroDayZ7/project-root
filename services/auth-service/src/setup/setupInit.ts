import { logger, setupCommonMiddleware } from '@zerodayz7/common';

export function createApp() {
  logger.info('🛠️  Creating Express app...');
  return setupCommonMiddleware();
}
