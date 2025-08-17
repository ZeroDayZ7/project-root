import { Router, Request, Response } from 'express';
import { client } from './metrics.service.ts';
import { CM } from '@/config/env.js';

export const metricsRouter: Router = Router();

metricsRouter.get('/', async (req: Request, res: Response<string>) => {
  if (req.headers['x-metrics-token'] !== CM.METRICS_TOKEN) {
    return res.status(401).send('Unauthorized');
  }
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
