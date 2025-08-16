import { Router } from "express";
import { checkEmailController } from "@/controllers/checkEmail.controller.ts";

const router = Router();

router.post("/check-email", checkEmailController);

export default router;
