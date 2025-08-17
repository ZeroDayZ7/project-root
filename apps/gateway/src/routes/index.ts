import { Router } from 'express';

import authProxy from './proxies/auth.proxy.js';

const router: Router = Router();

// router.use('/auth', authProxy);
router.use('/auth', (req, _res, next) => {
  console.log('Received on /auth:', req.method, req.originalUrl);
  next();
}, authProxy);


export default router;
