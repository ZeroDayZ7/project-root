import { Router } from 'express';
import express from 'express';

import authProxy from './proxies/auth.proxy-a.js';
import { logger } from '@zerodayz7/common';

const router: Router = Router();

// router.use('/auth', authProxy);
router.use('/auth', (req, _res, next) => {
  logger.info('Received on /auth:', req.method, req.originalUrl, req.body);
  next();
}, authProxy);


export default router;
