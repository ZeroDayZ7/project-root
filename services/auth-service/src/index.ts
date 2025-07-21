import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';
import { env } from './config/env.js';

async function startServer() {
  try {
    logger.info(`Application auth-service starting...`);

    const PORT = env.PORT;

    app.listen(PORT, () => {
      logger.info(`Server auth-service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start auth-service server:', error);
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('Shutting down auth-service server...');
  try {
    logger.info('Server auth-service stopped');
    process.exit(0);
  } catch (error) {
    logger.error('Error during auth-service shutdown:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
