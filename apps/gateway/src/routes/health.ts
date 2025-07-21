import express from 'express';

const router = express.Router();

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
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
