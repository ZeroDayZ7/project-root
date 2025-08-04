const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? '/api/mocks'
    : 'https://api.twojadomena.com';

export const ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  CHECKEMAIL: `${API_BASE_URL}/auth/login/check-email`,
  CHECKEPASSWORD: `${API_BASE_URL}/auth/login/check-email`,
  LOGIN: `${API_BASE_URL}/auth/login/check-email`,
  CART: `${API_BASE_URL}/cart`,

  CSRF: `${API_BASE_URL}/csrf.json`,
  // itd.
};
