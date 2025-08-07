import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from '../../utils/logger.js';
import { checkEmailRateLimiter } from '../rateLimiters.js';

const authProxy = Router();

authProxy.use(
  '/',
  checkEmailRateLimiter,
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    xfwd: true,
    pathRewrite: { '^/auth': '' },
    on: {
      proxyReq: (proxyReq, req, res) => {
        logger.info(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.path}`);
        proxyReq.setHeader('X-Gateway', 'API-Gateway');
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.write(bodyData);
        }
      },
      proxyRes: (proxyRes, req, res) => {
        logger.info(`Received response from auth microservice: Status ${proxyRes.statusCode}`);
      },
      error: (err, req, res) => {
        const response = res as import('express').Response;
        response.status(500).json({ message: 'Proxy error', error: err.message });
      },
    },
  }),
);

export default authProxy;
