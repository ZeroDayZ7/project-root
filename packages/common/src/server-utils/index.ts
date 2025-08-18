import { Server } from 'http';
import logger from 'utils/logger.ts';
import { ServerConfig, ServerOptions } from './types.js';
import { setupServerConfiguration } from './server-config.js';
import { logServerInfo } from './server-logging.js';
import { setupGracefulShutdown } from './graceful-shutdown.js';
import { setupErrorHandlers } from './server-handlers.js';

export async function setupServer(app: any, config: ServerConfig, options: ServerOptions = {}): Promise<Server> {
  async function startServer(): Promise<Server> {
    try {
      if (options.initializeServices) {
        logger.info(`🔧 Initializing services... [ ${config.name} ]`);
        await options.initializeServices();
      }

      return new Promise((resolve, reject) => {
        const serverInstance = app.listen(config.port, (err?: Error) => {
          if (err) {
            reject(err);
            return;
          }
          const server: Server = serverInstance;
          setupServerConfiguration(server, config);
          logServerInfo(server, config);
          setupGracefulShutdown(server, config, options); // Przekazujemy options
          resolve(server);
        });
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      throw error;
    }
  }

  setupErrorHandlers(config);
  return startServer();
}
