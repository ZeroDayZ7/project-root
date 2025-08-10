// lib/endpoints.ts
import { endpoint } from './apiBase';

export const ENDPOINTS = {
  USERS: endpoint('/users'),
  CHECKEMAIL: endpoint('/auth/login/check-email'),
  LOGIN: endpoint('/auth/login'),
  CART: endpoint('/cart'),
  CSRF: endpoint('/csrf'),
};
