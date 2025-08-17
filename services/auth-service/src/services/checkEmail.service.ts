// checkEmail.service.ts
import axios from "axios";
import env from "@/config/env.ts";
import { logger } from "@zerodayz7/common";

export async function checkEmailService(email: string): Promise<boolean> {
  // TODO: tutaj zamiast "user-service" dajesz prawdziwy adres z ENV
  const USER_SERVICE_URL = env.USER_SERVICE_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${USER_SERVICE_URL}/check-email`, {
      email
    });

    // jeśli user istnieje → zwracamy true
    logger.warn(`[Auth][Service] Response from user service: ${JSON.stringify(response.data, null, 2)}`);
    return response.data;
  } catch (err) {
    console.error("Błąd podczas sprawdzania emaila:", err);
    return false;
  }
}
