import { HttpClient } from './httpClient';

const USE_MOCK = 'true';
const MOCKS_BASE_URL = '/mocks';
const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';

export const api = new HttpClient({
  baseURL: USE_MOCK ? MOCKS_BASE_URL : GATEWAY_URL,
  timeout: 5000,
  csrfToken: typeof document !== 'undefined'
    ? document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''
    : '',
  getAuthToken: () => localStorage.getItem('jwt'),
  defaultHeaders: {
    Accept: 'application/json',
  },
});
