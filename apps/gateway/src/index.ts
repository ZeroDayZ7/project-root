import 'dotenv/config';
import app from './app.js';
import logger from './utils/logger.js';
import { Server } from 'http';
import env from './config/env.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

let server: Server | null = null;

// Pobierz wersję aplikacji z package.json
function getAppVersion(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

// Funkcja uruchamiająca serwer
async function startServer(): Promise<void> {
  try {
    logger.info(`🚀 Gateway starting...`);
    logger.info(`Mode: ${env.NODE_ENV}`);
    logger.info(`Version: ${getAppVersion()}`);

    server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error: unknown) {
    logger.error('Failed to start server:', error instanceof Error ? error.stack : error);
    process.exit(1);
    return;
  }
}

// Funkcja zamykająca serwer i inne zasoby
async function shutdown(): Promise<void> {
  logger.info('Shutting down server...');
  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server!.close((err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      logger.info('HTTP server closed');
    }
    // Gateway nie korzysta z bazy danych ani innych połączeń wymagających zamknięcia
    logger.info('Server stopped');
    process.exit(0);
    return;
  } catch (error: unknown) {
    logger.error('Error during shutdown:', error instanceof Error ? error.stack : error);
    process.exit(1);
    return;
  }
}

// Globalna obsługa niezłapanych wyjątków i odrzuconych obietnic
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  shutdown();
});
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  shutdown();
});

// Obsługa sygnałów systemowych
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
