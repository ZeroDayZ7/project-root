// packages/gateway/src/routes/auth.ts
import { Router } from "express";
import { logger } from "@zerodayz7/common";
import { validateRequest } from "@/common/middlerware/validate.middleware.ts";
import { checkEmailSchema, EmailPayload, checkPasswordSchema, PasswordPayload } from "@zerodayz7/common";
import { checkEmailController, checkPasswordController, check2FaController } from "@/controllers/auth/auth.controller.ts";

const authRouter: Router = Router();

authRouter.post(
  "/check-email",
  validateRequest<EmailPayload>(checkEmailSchema),
  checkEmailController
);

authRouter.post(
  "/check-password",
  validateRequest<PasswordPayload>(checkPasswordSchema),
  checkPasswordController
);
  
authRouter.post(
  "/check-2fa",
  validateRequest<EmailPayload>(checkEmailSchema),
  check2FaController
);
 

export default authRouter;
