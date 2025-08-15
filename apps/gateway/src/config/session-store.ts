import { RedisStore } from 'connect-redis';
import { redisClient } from '@/config/redis.config.js';
import { logger } from '@zerodayz7/common';
import env from '@/config/env.js';

export function createSessionStore(): RedisStore {
  // Sprawdzenie, czy klient Redis jest gotowy
  if (!redisClient.isReady) {
    logger.error('Redis client is not ready for session store');
    throw new Error('Redis client is not ready');
  }

  const store = new RedisStore({
    client: redisClient,
    prefix: 'session:', // Prefiks dla kluczy sesji w Redis
    ttl: Math.floor(env.SESSION_EXPIRES / 1000), // Konwersja ms na sekundy dla spójności
  });

  // Obsługa błędów RedisStore
  store.on('error', (err: Error) => {
    logger.error('Redis session store error', {
      error: err.message,
      stack: err.stack,
    });
  });

  logger.info('✅ Redis session store created successfully');
  return store;
}