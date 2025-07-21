// src/proxies/authProxy.ts
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();
router.use(
  '/', // Proxy będzie działać dla wszystkich ścieżek podłączonych do tego routera
  createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' },
  })
);
export default router;