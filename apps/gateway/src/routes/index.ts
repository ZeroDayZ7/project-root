import { Router } from 'express';
import { logger } from '@zerodayz7/common';
import { getCsrfToken } from '@/common/csrf/csrf.controller.ts';
import { sessionInitHandler } from '@/controllers/session.controller.ts';
import authRouter from './auth/auth.ts';

const router: Router = Router();

// router.get('/csrf-token', getCsrfToken);

router.get('/session-init', sessionInitHandler);

router.use('/auth', authRouter);

export default router;
