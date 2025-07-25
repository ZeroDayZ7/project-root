import { Router } from 'express';
import { forgotPasswordRateLimiter, resetPasswordRateLimiter, changePasswordRateLimiter } from '../../config/rateLimiters.config';
import { forgotPasswordController } from '../../controllers/auth/password.controller';
import { resetPasswordController } from '../../controllers/auth/password.controller';
import { changePasswordController } from '../../controllers/auth/password.controller';

const router = Router();

router.post('/forgot-password', forgotPasswordRateLimiter, forgotPasswordController);
router.post('/reset-password', resetPasswordRateLimiter, resetPasswordController);
router.post('/change-password', changePasswordRateLimiter, changePasswordController);

export default router; 