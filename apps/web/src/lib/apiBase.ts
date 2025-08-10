// lib/apiBase.ts
const IS_DEV = process.env.NODE_ENV === 'development';

// Możesz dodać bazowy URL z .env, np. NEXT_PUBLIC_API_BASE_URL
const API_BASE_URL = IS_DEV
  ? process.env.NEXT_PUBLIC_MOCKS_BASE_URL || '/api/mocks'
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.twojadomena.com';

/**
 * Tworzy pełny URL endpointu.
 * Jeśli jesteśmy w dev, dodaje `.json` na końcu.
 */
export function endpoint(path: string): string {
  return IS_DEV ? `${API_BASE_URL}${path}.json` : `${API_BASE_URL}${path}`;
}
