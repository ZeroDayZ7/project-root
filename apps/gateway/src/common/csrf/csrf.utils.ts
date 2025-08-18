import { uuidv4, logger } from '@zerodayz7/common';

export const generateCsrfToken = (): string => {
  try {
    return uuidv4();
  } catch (error) {
    logger.error('Błąd generowania tokena CSRF', { error: (error as Error).message });
    throw new Error('CSRF_GENERATION_FAILED');
  }
};

export const verifyCsrfToken = (csrfToken: string, expectedToken: string): void => {
  if (!csrfToken || !expectedToken) {
    logger.warn('Brak CSRF lub oczekiwanego tokenu podczas weryfikacji');
    throw new Error('CSRF_TOKEN_INVALID');
  }
  if (csrfToken !== expectedToken) {
    logger.warn('Niezgodność tokena CSRF', { csrfToken: csrfToken.slice(0, 10) + '...' });
    throw new Error('CSRF_TOKEN_INVALID');
  }
};
