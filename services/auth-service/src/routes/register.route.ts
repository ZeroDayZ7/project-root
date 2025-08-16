import { Router } from 'express';
import { registerController } from '@/controllers/register.controller.ts';

const router: Router = Router();

router.post('/register', registerController);

export default router; 