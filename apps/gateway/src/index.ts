import 'dotenv/config';
import { AddressInfo } from 'net';
import { Server } from 'http';
import app from './app.js';
// import logger from './utils/logger.js';
import env from './config/env.js';
import { markShuttingDown, isShuttingDown } from './utils/server/shutdown.js';
import { logger } from '@neo/common';

let server: Server | null = null;

const SHUTDOWN_TIMEOUT = 30_000;

function logServerInfo(server: Server) {
  const address = server.address();
  if (address && typeof address === 'object') {
    logger.info(`🚀 Gateway running on port ${(address as AddressInfo).port}`);
  } else {
    logger.info(`🚀 Gateway running (port unknown)`);
  }
  logger.info(`Mode: ${env.NODE_ENV}`);
  logger.info(`Version: ${env.APP_VERSION}`);
  logger.info(`PID: ${process.pid}`);
}

async function startServer(): Promise<void> {
  if (!env.PORT) {
    logger.error('PORT is not defined in environment variables.');
    process.exit(1);
  }

  try {
    server = app.listen(env.PORT, () => logServerInfo(server!));

    server.keepAliveTimeout = 61_000; // 61s keep-alive
    server.headersTimeout = 65_000;   // 65s total headers timeout

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        logger.error(`Port ${env.PORT} is already in use.`);
      } else {
        logger.error('Server error:', err.stack || err);
      }
      process.exit(1);
    });

    server.on('clientError', (error, socket) => {
      logger.warn(`Client error: ${error.message}`);
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
  } catch (error) {
    logger.error('Failed to start server:', (error as Error).stack || error);
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
      await new Promise<void>((resolve, reject) =>
        server!.close((err) => (err ? reject(err) : resolve()))
      );
      logger.info('✅ Server closed');
    }
    clearTimeout(timer);
    logger.info('👋 Graceful shutdown complete. Goodbye!');
    process.exit(0);
  } catch (error) {
    logger.error('Shutdown error:', (error as Error).stack || error);
    clearTimeout(timer);
    process.exit(1);
  }
}

// Signal handlers
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((sig) => {
  process.on(sig, () => shutdown(sig));
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.stack || err);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

await startServer();
