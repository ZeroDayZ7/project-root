import { Router, Request, Response } from 'express';
import { client } from './metrics.service.ts';

export const metricsRouter: Router = Router();

metricsRouter.get('/', async (_req: Request, res: Response<string>) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
