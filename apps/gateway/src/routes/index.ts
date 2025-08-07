import { Router } from 'express';

import authProxy from './proxies/auth.proxy.js';
import healthRouter from './endpoints/health.route.js';
import metricsRouter from './endpoints/metrics.route.js';

import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from '../utils/logger.js';

// import checkEmailRouter from './checkEmail.route.js';
// import healthRouter from './health.route.js';
// import metricsRouter from './metrics.route.js';


const router = Router();

// router.use('/auth', authProxy);
router.use('/auth', (req, res, next) => {
  console.log('Received on /auth:', req.method, req.originalUrl);
  next();
}, authProxy);

// const checkEmailRateLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 20,
//   message: 'Za dużo prób sprawdzania email, spróbuj za chwilę',
// });

// Proxy middleware do auth service pod ścieżką /api/auth
// router.use(
//   '/auth',
//   checkEmailRateLimiter,
//   createProxyMiddleware({
//     target: 'http://localhost:5000',
//     changeOrigin: true,
//     xfwd: true, 
//     pathRewrite: {
//       '^/auth': '', // usuń /auth z początku, żeby przekazać właściwą ścieżkę do serwisu auth
//     },
//     on: {
//       proxyReq: (proxyReq, req, res) => {
//         logger.info(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.path}`);
//         proxyReq.setHeader('X-Gateway', 'API-Gateway');
//         // Przekazanie body (ważne, bo domyślnie body może się nie wysłać)
//         if (req.body) {
//           const bodyData = JSON.stringify(req.body);
//           proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
//           proxyReq.setHeader('Content-Type', 'application/json');
//           proxyReq.write(bodyData);
//         }
//       },
//       proxyRes: (proxyRes, req, res) => {
//         logger.info(`Received response from auth microservice: Status ${proxyRes.statusCode}`);
//       },
//       error: (err, req, res) => {
//         const response = res as import('express').Response;
//         response.status(500).json({ message: 'Proxy error', error: err.message });
//       },
//     },
//   }),
// );

router.use('/health', healthRouter);
router.use('/metrics', metricsRouter);

export default router;
