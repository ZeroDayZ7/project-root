import { Router } from 'express';
import { loginController } from '@/controllers/auth/login.controller.ts'

const router: Router = Router();

router.post('/login', loginController);

export default router; 