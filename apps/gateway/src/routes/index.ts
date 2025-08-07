import { Router } from 'express';

import authProxy from './proxies/auth.proxy.js';
import healthRouter from './endpoints/health.route.js';
import metricsRouter from './endpoints/metrics.route.js';

const router = Router();

router.use('/auth', authProxy);
router.use('/health', healthRouter);
router.use('/metrics', metricsRouter);

export default router;
