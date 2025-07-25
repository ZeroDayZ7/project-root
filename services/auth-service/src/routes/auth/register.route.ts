import { Router } from 'express';
import { registerRateLimiter } from '../../config/rateLimiters.config';
import { registerController } from '../../controllers/auth/register.controller';

const router = Router();

router.post('/register', registerRateLimiter, registerController);

export default router; 