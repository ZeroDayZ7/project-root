// authClient.ts
import { HttpClient, logger } from '@zerodayz7/common';
import env from '@/config/env.ts';

export let authClient: HttpClient;

export function initAuthClient() {
  authClient = new HttpClient({
    baseURL: env.AUTH_SERVICE_URL || 'http://localhost:5000',
    timeout: 5000,
    getAuthToken: () => null,
  });
  logger.info(`authClient initialized with base URL: ${env.AUTH_SERVICE_URL} `);
}