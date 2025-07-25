import { Router } from 'express';
import loginRouter from './login.route';
import registerRouter from './register.route';
import passwordRouter from './password.route';

const router = Router();

router.use(loginRouter);
router.use(registerRouter);
router.use(passwordRouter);

export default router; 