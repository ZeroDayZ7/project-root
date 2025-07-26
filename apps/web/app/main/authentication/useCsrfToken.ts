import { useState, useEffect } from 'react';

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>('mock-csrf-token');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCsrfToken('mock-csrf-token');
      setIsLoading(false);
    }, 500);
  }, []);

  const refreshToken = () => {
    setCsrfToken('mock-csrf-token');
  };

  return { csrfToken, isLoading, error, refreshToken };
}