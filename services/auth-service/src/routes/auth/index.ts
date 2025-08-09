import { Router } from 'express';
import loginRouter from '@/routes/auth/login.route.ts';
import registerRouter from '@/routes/auth/register.route.ts';
import passwordRouter from '@/routes/auth/password.route.ts';

const router: Router = Router();

router.use(loginRouter);
router.use(registerRouter);
router.use(passwordRouter);

export default router; 