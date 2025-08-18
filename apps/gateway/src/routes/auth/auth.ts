// packages/gateway/src/routes/auth.ts
import { Router } from "express";
import { logger } from "@zerodayz7/common";
import env from "@/config/env.js";

const authRouter: Router = Router();
const AUTH_URL = env.AUTH_SERVICE_URL || "http://localhost:5000";

authRouter.post("/check-email", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    logger.info(`Checking if email exists: ${email}`);

    const response = await fetch(`${AUTH_URL}/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Auth service error: ${response.status}`);
    }

    const data = await response.json(); // np. { exists: true }

    res.json({ success: data.exists, ...data });
  } catch (err) {
    logger.error("Error in check-email endpoint:", err);
    next(err);
  }
});

export default authRouter;
