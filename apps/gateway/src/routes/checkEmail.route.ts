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

router.use(
  '/',
  checkEmailRateLimiter,
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: { '^/': '/check-email' }, // Poprawka: mapuj / na /check-email
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.path}`);
        // Przekazuj ciało żądania
        // if (req.body) {
          // const bodyData = JSON.stringify(req.body);
          // proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          // proxyReq.setHeader('Content-Type', 'application/json');
          // proxyReq.write(bodyData);
        // }
      },
      proxyRes: (proxyRes, req, res) => {
        logger.info(`Received response from microservice: Status ${proxyRes.statusCode}`);
        // Dodaj nagłówki CORS
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      },
      error: (err, req, res) => {
        logger.error(`Proxy error: ${err.message}`);
        // res.status(500).json({ message: 'Proxy error', error: err.message });
      },
    },
  })
);

// Obsługa żądania OPTIONS dla CORS
// router.options('/', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.sendStatus(200);
// });

export default router;