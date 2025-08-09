import { Router } from 'express';
import { forgotPasswordController } from '@/controllers/auth/password.controller.ts';
import { resetPasswordController } from '@/controllers/auth/password.controller.ts';
import { changePasswordController } from '@/controllers/auth/password.controller.ts';

const router: Router = Router();

router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/change-password', changePasswordController);

export default router; 