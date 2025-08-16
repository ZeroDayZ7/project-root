import { Router } from 'express';
import { loginController } from '@/controllers/login.controller.ts'

const router: Router = Router();

router.get('/logino', loginController);

export default router; 