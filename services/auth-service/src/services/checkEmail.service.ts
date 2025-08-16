// checkEmail.service.ts
import axios from "axios";

export async function checkEmailService(email: string): Promise<boolean> {
  // TODO: tutaj zamiast "user-service" dajesz prawdziwy adres z ENV
  const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:4000";

  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users/by-email`, {
      params: { email },
    });

    // jeśli user istnieje → zwracamy true
    return response.data?.exists === true;
  } catch (err) {
    console.error("Błąd podczas sprawdzania emaila:", err);
    return false;
  }
}
