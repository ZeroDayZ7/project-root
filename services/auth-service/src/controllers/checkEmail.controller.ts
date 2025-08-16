import { Request, Response } from "express";
import { checkEmailService } from "@/services/checkEmail.service.ts";

export async function checkEmailController(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const exists = await checkEmailService(email);

  return res.json({ success: exists });
}
