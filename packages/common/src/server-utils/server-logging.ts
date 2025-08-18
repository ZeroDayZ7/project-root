import { Server } from 'http';
import { AddressInfo } from 'net';
import logger from 'utils/logger.ts';
import { ServerConfig } from './types.js';

export function logServerInfo(server: Server, config: ServerConfig): void {
  const address = server.address();
  if (address && typeof address === 'object') {
    logger.info(`🚀 Server running on port ${(address as AddressInfo).port}`);
  } else {
    logger.info(`🚀 Server running (port unknown)`);
  }
  logger.info(`Mode: ${config.nodeEnv}`);
  logger.info(`Version: ${config.appVersion}`);
  logger.info(`PID: ${process.pid}`);
  logger.info(`Maximum connections: ${config.maxConnections}`);
  logger.info(`Keep-alive timeout: ${config.keepAliveTimeout || 61_000}ms`);
}