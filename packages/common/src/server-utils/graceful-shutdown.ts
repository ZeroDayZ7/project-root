import { Server } from 'http';
import logger from '../utils/logger.ts';
import { isShuttingDown, markShuttingDown } from '../utils/server/shutdown.ts';
import { ServerConfig, ServerOptions } from './types.js';

export function setupGracefulShutdown(server: Server, config: ServerConfig, options: ServerOptions = {}): () => Promise<void> {
  const DEFAULT_SHUTDOWN_TIMEOUT = config.shutdownTimeout || 30_000;

  async function gracefulShutdown(signal?: string): Promise<void> {
    if (isShuttingDown()) return;
    markShuttingDown();

    logger.info(`🛑 Received ${signal || 'shutdown signal'}, starting graceful shutdown...`);

    const timer = setTimeout(() => {
      logger.error('Forced shutdown due to timeout');
      process.exit(1);
    }, DEFAULT_SHUTDOWN_TIMEOUT);

    try {
      if (server) {
        await new Promise<void>((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
        logger.info('✅ Server closed');
      }

      if (options.closeServices) {
        logger.info(`🔧 Closing services... [ ${config.name} ]`);
        await options.closeServices(); // Wywołanie specyficznych operacji zamykania
      }

      clearTimeout(timer);
      logger.info('👋 Graceful shutdown complete. Goodbye!');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      clearTimeout(timer);
      process.exit(1);
    }
  }

  ['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach((sig) => {
    process.on(sig, () => gracefulShutdown(sig));
  });

  return gracefulShutdown;
}
