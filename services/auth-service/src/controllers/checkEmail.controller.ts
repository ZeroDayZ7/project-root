import { Request, Response } from "express";
import { checkEmailService } from "@/services/checkEmail.service.ts";
import { logger } from "@zerodayz7/common";

export async function checkEmailController(req: Request, res: Response) {
  const { email } = req.body;
  logger.info(`[Auth][Controller]Received email for check: ${email}`);

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const exists = await checkEmailService(email);
  logger.warn(`[Auth][Controller]Email exists: ${JSON.stringify(exists, null, 2)}`);

  return res.status(200).json( exists );
}
