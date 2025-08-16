import { Router } from 'express';
import loginRouter from '@/routes/login.route.ts';
import registerRouter from '@/routes/register.route.ts';
import passwordRouter from '@/routes/password.route.ts';
import checkemail from '@/routes/check-email.route.ts'

const router: Router = Router();

router.use(checkemail);

router.use(loginRouter);
router.use(registerRouter);
router.use(passwordRouter);


export default router; 