import { logger } from '@neo/common';
import { createClient, RedisClientType } from 'redis';
import env from '@/config/env.js';

// Konfiguracja klienta Redis
const redisClient: RedisClientType = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  password: env.REDIS_PASSWORD, // Obsługuje brak hasła
  socket: {
    connectTimeout: 10000, // 10s timeout na połączenie
    keepAlive: true, 
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error('❌ Max Redis reconnect attempts reached');
        return new Error('Max reconnect attempts reached');
      }
      return Math.min(retries * 100, 3000); // Eksponencjalny backoff
    },
  },
});

// Logowanie zdarzeń
redisClient.on('ready', () => {
  logger.info(`✅ Redis client ready on ${env.REDIS_HOST}:${env.REDIS_PORT}`);
});

redisClient.on('error', (err) => {
  logger.error('❌ Redis error:', err);
});

redisClient.on('reconnecting', () => {
  logger.warn('🔄 Redis reconnecting...');
});

redisClient.on('end', () => {
  logger.info('🔌 Redis connection closed');
});

// Funkcja inicjalizująca połączenie
export const initRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (err) {
      logger.error('❌ Failed to connect to Redis:', err);
      throw err;
    }
  }
};

// Funkcja zamykająca połączenie
export const closeRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    try {
      await redisClient.quit(); // Używa QUIT zamiast disconnect dla graceful shutdown
      logger.info('✅ Redis connection closed gracefully');
    } catch (err) {
      logger.error('❌ Failed to close Redis connection:', err);
      throw err;
    }
  }
};

export { redisClient };