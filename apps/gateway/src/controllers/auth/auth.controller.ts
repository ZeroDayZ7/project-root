// controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { logger, PasswordPayload } from "@zerodayz7/common";
import * as authService from "@/services/auth.service.js";
import { getValidatedData } from "@/common/middlerware/validate.middleware.js";
import { EmailPayload } from "@zerodayz7/common";

export async function checkEmailController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = getValidatedData<EmailPayload>(req);

    logger.info(`[AUTH]: Checking if email exists: ${email}`);

    const result = await authService.checkEmail(email);

    res.json({ success: result.exists, ...result });
  } catch (err) {
    logger.error("Error in check-email controller:", err);
    next(err);
  }
}

export async function checkPasswordController(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = getValidatedData<PasswordPayload>(req);

    logger.info(`[AUTH]: Checking if password exists: ${password}`);

    const result = await authService.checkPassword(password);

    res.json({ success: result.exists, ...result });
  } catch (err) {
    logger.error("Error in check-email controller:", err);
    next(err);
  }
}

export async function check2FaController(req: Request, res: Response, next: NextFunction) {
  try {
    const { password } = getValidatedData<PasswordPayload>(req);

    logger.info(`[AUTH]: Checking if password exists: ${password}`);

    const result = await authService.checkPassword(password);

    res.json({ success: result.exists, ...result });
  } catch (err) {
    logger.error("Error in check-email controller:", err);
    next(err);
  }
}
