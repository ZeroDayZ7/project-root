import { Router } from 'express';
import { loginRateLimiter } from '../../config/rateLimiters.config';
import { loginController } from '../../controllers/auth/login.controller';

const router = Router();

router.post('/login', loginRateLimiter, loginController);

export default router; 