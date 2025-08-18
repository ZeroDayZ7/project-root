import 'dotenv/config';
import { setupServer } from '@zerodayz7/common';
import { logger } from '@zerodayz7/common';
import app from './app.js';
import env from './config/env.js';

const serverConfig = {
  port: env.PORT,
  name: env.NAME,
  nodeEnv: env.NODE_ENV,
  appVersion: env.APP_VERSION,
  maxConnections: env.MAX_CONNECTIONS,
  requestTimeout: env.REQUEST_TIMEOUT,
};

async function initializeServices(): Promise<void> {
  // Tutaj inicjalizacja specyficzna dla serwisu, np. Redis, session manager
  logger.info('Inicjalizacja specyficznych serwisów dla mikeoservisu');
  // np. await redis.connect();
}

async function bootstrap(): Promise<void> {
  try {
    await setupServer(app, serverConfig, { initializeServices });
    logger.info('🎉 Aplikacja uruchomiona pomyślnie');
  } catch (error) {
    logger.error('Błąd podczas uruchamiania:', error);
    process.exit(1);
  }
}

bootstrap();