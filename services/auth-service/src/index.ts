import 'dotenv/config';
import { registerErrorHandlers, setupServer } from '@zerodayz7/common';
import { logger } from '@zerodayz7/common';
import env from './config/env.js';
import { createApp } from './setup/setupInit.ts';
import { setupRoutes } from './setup/setupRoutes.ts';
 
const serverConfig = {
  port: env.PORT,
  name: env.NAME,
  nodeEnv: env.NODE_ENV,
  appVersion: env.APP_VERSION,
  maxConnections: env.MAX_CONNECTIONS,
  requestTimeout: env.REQUEST_TIMEOUT,
};

const app = createApp();

async function initializeServices(): Promise<void> {
  // Tutaj inicjalizacja specyficzna dla serwisu, np. Redis, session manager
  logger.info('🔧 Inicjalizacja specyficznych serwisów dla mikeoservisu');
  setupRoutes(app);
  registerErrorHandlers(app, {
    serviceName: serverConfig.name,
    isDev: serverConfig.nodeEnv === 'development',
  });
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