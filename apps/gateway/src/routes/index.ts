import { Router } from 'express';

import authProxy from './proxies/auth.proxy.js';
import healthRouter from './endpoints/health.route.js';
import metricsRouter from './endpoints/metrics.route.js';

// import checkEmailRouter from './checkEmail.route.js';
// import healthRouter from './health.route.js';
// import metricsRouter from './metrics.route.js';


const router = Router();

// router.use('/auth', authProxy);
router.use('/auth', (req, res, next) => {
  console.log('Received on /auth:', req.method, req.originalUrl);
  next();
}, authProxy);


router.use('/health', healthRouter);
router.use('/metrics', metricsRouter);

export default router;
