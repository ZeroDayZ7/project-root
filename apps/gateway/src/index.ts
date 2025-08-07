import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';
import env from './config/env.js';
import { AddressInfo } from 'net';
import { Server } from 'http';
import { markShuttingDown, isShuttingDown } from './utils/server/shutdown.js';
import { getAppVersion } from 'utils/server/getAppVersion.js';

let server: Server | null = null;

const SHUTDOWN_TIMEOUT = 30000;

async function startServer() {
  try {
    server = app.listen(env.PORT, () => {
      const address = server!.address();
      if (address && typeof address === 'object') {
        const port = (address as AddressInfo).port;
        logger.info(`🚀 Gateway running on port ${port}`);
      } else {
        logger.info(`🚀 Gateway running (port unknown)`);
      }

      logger.info(`Mode: ${env.NODE_ENV}`);
      logger.info(`Version: ${getAppVersion()}`);
      logger.info(`PID: ${process.pid}`);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        logger.error(`Port ${env.PORT} is already in use.`);
      } else {
        logger.error('Server error:', err);
      }
      process.exit(1);
    });

    server.on('clientError', (error, socket) => {
      logger.warn('Client error:', error.message);
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

async function shutdown(signal?: string) {
  if (isShuttingDown()) return;
  markShuttingDown();
  logger.info(`🛑 Received ${signal || 'shutdown'}, starting graceful shutdown...`);

  const timer = setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => server!.close((err) => (err ? reject(err) : resolve())));
      logger.info('✅ Server closed');
    }

    clearTimeout(timer);
    logger.info('👋 Graceful shutdown complete. Goodbye!');
    process.exit(0);
  } catch (error) {
    logger.error('Shutdown error:', error);
    clearTimeout(timer);
    process.exit(1);
  }
}

// Obsługa sygnałów
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

await startServer();
