import { Router } from 'express';
import checkEmailRouter from './checkEmail.route.js';
import healthRouter from './health.route.js';
import metricsRouter from './metrics.route.js';

const router = Router();
 
// Rejestracja tras
router.use('/check-email', checkEmailRouter);
router.use('/health', healthRouter);
router.use('/metrics', metricsRouter);

// Możesz dodawać kolejne trasy tutaj, np.:
// router.use('/nowa-trasa', nowaTrasaRouter);

export default router;