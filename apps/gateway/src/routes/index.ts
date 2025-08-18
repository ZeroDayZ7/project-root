import { Router } from 'express';
import authProxy from './proxies/auth.proxy-a.js';
import { logger } from '@zerodayz7/common';
import { getCsrfToken } from '@/common/csrf/csrf.controller.ts';
import { sessionInitHandler } from '@/controllers/session.controller.ts';

const router: Router = Router();

// router.get('/csrf-token', getCsrfToken);

router.get('/session-init', sessionInitHandler);

// Logowanie wszystkich żądań do /auth
router.use('/auth', (req, _res, next) => {
  logger.info('Received on /auth:', req.method, req.originalUrl, req.body);
  next();
}, authProxy);


export default router;
