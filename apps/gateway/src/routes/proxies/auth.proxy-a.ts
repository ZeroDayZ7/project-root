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
      proxyReq: (proxyReq, req: Request, _res: Response) => {
        proxyReq.setHeader('X-Gateway', 'API-Gateway');
        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.write(bodyData);
        } else {
          logger.warn('No body provided in request');
        }
      },
      proxyRes: (proxyRes, _req: Request, _res: Response) => {
        logger.info(`Received response from auth microservice: Status ${proxyRes.statusCode}`);
      },
      error: (err, _req, res) => {
        const response = res as import('express').Response;
        response.status(500).json({ message: 'Proxy error', error: err.message });
      },
    },
  }),
);

export default authProxy;
