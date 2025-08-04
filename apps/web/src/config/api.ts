const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api' // lub '/mocks' dla JSON
    : 'https://api.twojadomena.com';

export const ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  CART: `${API_BASE_URL}/cart`,
  // itd.
};
