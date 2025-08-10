const isBrowser = typeof window !== 'undefined';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
const BASE_PATH = isBrowser && process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' ? '/project-root' : '';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${BASE_PATH}${endpoint}`;
  return fetch(url, options);
};