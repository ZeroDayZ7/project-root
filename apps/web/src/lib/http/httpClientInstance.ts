import { HttpClient } from './httpClient';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:4000';

export const api = new HttpClient({
  baseURL: GATEWAY_URL,
  timeout: 5000,
  csrfToken: typeof document !== 'undefined'
    ? document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''
    : '',
  getAuthToken: () => localStorage.getItem('jwt'),
  defaultHeaders: {
    Accept: 'application/json',
  },
});
