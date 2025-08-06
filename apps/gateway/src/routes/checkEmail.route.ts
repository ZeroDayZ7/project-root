import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from '../utils/logger.js';

const router = Router();

const checkEmailRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: 'Za dużo prób sprawdzania email, spróbuj za chwilę',
});

// Middleware rate limiting dla konkretnego endpointu
router.use( 
  '/auth',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: { '': '' }, // Poprawka: mapuj / na /check-email
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.path}`);
      },
      proxyRes: (proxyRes, req, res) => {
        logger.info(`Received response from microservice: Status ${proxyRes.statusCode}`);
      },
      error: (err, req, res) => {
        logger.error(`Proxy error: ${err.message}`);
      },
    },
  }),
);

export default router;
