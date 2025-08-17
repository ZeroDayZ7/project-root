import { Request, Response } from "express";
import { checkEmailService } from "@/services/checkEmail.service.ts";
import { logger } from "@zerodayz7/common";

export async function checkEmailController(req: Request, res: Response) {
  const { email } = req.body;
  logger.warn(`[Auth][Controller]Received email for check: ${email}`);

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  logger.warn(`[Auth][Controller]Checking if email exists: ${email}`);

  const exists = await checkEmailService(email);
  logger.warn(`[Auth][Controller]Email exists: ${JSON.stringify(exists, null, 2)}`);

  return res.status(200).json( exists );
}
