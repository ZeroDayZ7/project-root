import { logger, setupCommonMiddleware } from '@zerodayz7/common';
import { corsOptions } from '../config/cors.config.ts';
import { helmetOptions } from '../config/helmet.config.ts';

export function createApp() {
  logger.info('🛠️  Creating Express app...');
  return setupCommonMiddleware({ cors: corsOptions, helmet: helmetOptions });
}
