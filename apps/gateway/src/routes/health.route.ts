// routes/health.route.ts
import { Router } from 'express';
import { getHealthStatus, isShuttingDown } from '../utils/health.js';

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Sprawdzenie statusu serwera
 *     description: Endpoint służy do sprawdzania, czy serwer działa poprawnie.
 *     responses:
 *       200:
 *         description: Serwer działa poprawnie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */

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