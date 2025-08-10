'use client';

import { useEffect, useState } from 'react';
import { getCsrfToken } from './csrfService';

export interface CsrfTokenState {
  csrfToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useCsrfToken(): CsrfTokenState {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    console.log(`[useCsrfToken]: useEffect`);
    const fetchCsrfToken = async () => {
      try {
        const data = await getCsrfToken();
        if (isMounted) {
          console.log(`[useCsrfToken]: Pobrano token CSRF: ${data.csrfToken}`);
          setCsrfToken(data.csrfToken);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('[useCsrfToken]: Nie udało się pobrać tokenu CSRF');
          setIsLoading(false);
        }
      }
    };

    fetchCsrfToken();

    return () => {
      isMounted = false;
    };
  }, []);

  return { csrfToken, isLoading, error };
}
