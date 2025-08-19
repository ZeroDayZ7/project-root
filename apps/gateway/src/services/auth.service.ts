// services/auth.service.ts
import env from "@/config/env.js";

const AUTH_URL = env.AUTH_SERVICE_URL || "http://localhost:5000";

export async function checkEmail(email: string): Promise<{ exists: boolean }> {
  const response = await fetch(`${AUTH_URL}/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Auth service error: ${response.status}`);
  }

  return response.json();
}


export async function checkPassword(email: string): Promise<boolean> {
  const response = await fetch(`${AUTH_URL}/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Auth service error: ${response.status}`);
  }

  return response.json();
}