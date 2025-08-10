import { ENDPOINTS } from '@/lib/endpoints';

export interface CsrfResponse {
  csrfToken: string;
}

/**
 * Pobiera token CSRF z pliku JSON w folderze public.
 * @returns Obiekt zawierający token CSRF.
 * @throws Error w przypadku niepowodzenia pobierania.
 */
export async function getCsrfToken(): Promise<CsrfResponse> {
  console.log('[getCsrfToken]: fetching CSRF from:', ENDPOINTS.CSRF);
  try {
    const res = await fetch(ENDPOINTS.CSRF, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Nie udało się pobrać tokenu CSRF: ${res.status}`);
    }
    console.log(`[getCsrfToken][status]: ${res.status}`);
    return res.json();
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Nieznany błąd podczas pobierania tokenu CSRF',
    );
  }
}
