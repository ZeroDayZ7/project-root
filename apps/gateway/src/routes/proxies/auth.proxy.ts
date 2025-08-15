import { Router, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger } from '@zerodayz7/common';

const authProxy: Router = Router();

authProxy.use(
  '/',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
    xfwd: true,
    pathRewrite: { '^/auth': '' },
    on: {
      proxyReq: (proxyReq, req: Request, res: Response) => {
        logger.info(`Proxying request: ${req.method} ${req.url} -> ${proxyReq.path}`);
        proxyReq.setHeader('X-Gateway', 'API-Gateway');
        if (req.body) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.write(bodyData);
        }
      },
      proxyRes: (proxyRes, req: Request, res: Response) => {
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
