const API_URL = process.env.NEXT_PUBLIC_API_SERV || "http://localhost:4000";
const DEFAULT_TIMEOUT = 5000;

interface ApiOptions extends RequestInit {
  timeout?: number;
}

export async function apiFetch<T = any>(
  endpoint: string,
  { timeout = DEFAULT_TIMEOUT, ...options }: ApiOptions = {}
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include", // zawsze wysyła cookies
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options.headers || {}),
    },
    signal: controller.signal,
    ...options,
  }).finally(() => clearTimeout(timer));

  if (!res.ok) {
    let msg = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {}
    throw new Error(msg);
  }

  try {
    return (await res.json()) as T;
  } catch {
    return undefined as T; // np. 204 No Content
  }
}
