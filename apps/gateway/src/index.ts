import env from './config/env.js';
import { registerErrorHandlers, setupServer } from '@zerodayz7/common';
import { logger } from '@zerodayz7/common';
import { createApp } from './setup/setupInit.ts';
import { setupRoutes } from './setup/setupRoutes.ts';

import { initRedis, closeRedis } from '@/config/redis.config.js';
import sessionManager from '@/config/session.config.js';
import { initAuthClient } from './lib/authClient.ts';

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
  await initRedis();
  sessionManager(app);
  setupRoutes(app);
  initAuthClient(); 
  registerErrorHandlers(app, {
    serviceName: serverConfig.name,
    isDev: serverConfig.nodeEnv === 'development',
  });
}

async function closeServices(): Promise<void> {
  logger.info('Zamykanie specyficznych serwisów dla mikeoservisu');
  await closeRedis(); // Zamykanie Redisa
}

async function bootstrap(): Promise<void> {
  try {
    await setupServer(app, serverConfig, { initializeServices, closeServices });
    logger.info('🎉 Aplikacja uruchomiona pomyślnie');
  } catch (error) {
    logger.error('Błąd podczas uruchamiania:', error);
    process.exit(1);
  }
}

bootstrap();
