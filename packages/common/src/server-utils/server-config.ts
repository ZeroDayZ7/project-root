import { Server } from 'http';
import logger from 'utils/logger.ts';
import { ServerConfig } from './types.js';
import { Socket } from 'net';

export function setupServerConfiguration(server: Server, config: ServerConfig): void {
  const DEFAULT_CONFIG = {
    SHUTDOWN_TIMEOUT: 30_000,
    KEEP_ALIVE_TIMEOUT: 61_000,
    HEADERS_TIMEOUT: 65_000,
    ...config,
  } as const;

  server.keepAliveTimeout = DEFAULT_CONFIG.KEEP_ALIVE_TIMEOUT;
  server.headersTimeout = DEFAULT_CONFIG.HEADERS_TIMEOUT;
  server.requestTimeout = config.requestTimeout;
  server.maxConnections = config.maxConnections;

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${config.port} is already in use.`);
    } else if (err.code === 'EACCES') {
      logger.error(`Permission denied to bind to port ${config.port}`);
    } else {
      logger.error('Server error:', { error: err.message, code: err.code, stack: err.stack });
    }
    process.exit(1);
  });

  server.on('clientError', (error: Error, socket: Socket) => {
    logger.warn(`Client error: ${error.message}`, {
      remoteAddress: socket.remoteAddress,
      remotePort: socket.remotePort,
    });
    if (socket.writable && !socket.destroyed) {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }
  });

  server.on('connection', (socket) => {
    socket.on('error', (err) => {
      logger.debug('Socket error:', err.message);
    });
  });
}