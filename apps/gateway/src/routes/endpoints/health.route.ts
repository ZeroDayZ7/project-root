// routes/health.route.ts
import { Router } from 'express';
import { getHealthStatus, isShuttingDown } from '@/utils/server/index.js'

const router = Router();

router.get('/', (req, res) => {
  if (isShuttingDown()) {
    return res.status(503).json({
      status: 'shutting_down',
      message: 'Server is shutting down',
    });
  }

  res.json(getHealthStatus());
});

export default router;