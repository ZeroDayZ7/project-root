// gateway/src/controllers/session.controller.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '@zerodayz7/common';
import { generateCsrfToken } from '@/common/csrf/csrf.utils.ts';

export const sessionInitHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    // express-session automatycznie tworzy req.session jeśli go nie ma
    if (!req.session) {
      throw new Error('Session middleware nie jest poprawnie zainicjalizowane');
    }

    // Wygeneruj CSRF token i zapisz w sesji
    const csrfToken = generateCsrfToken();
    req.session.csrfToken = csrfToken;

    logger.info(`[SESSION INIT] Nowa sesja: ${req.session.id}, CSRF token: ${csrfToken}`);

    // Wyślij token do klienta
    res.status(200).json({ csrfToken });
  } catch (error: any) {
    logger.error('[SESSION INIT] Błąd inicjalizacji sesji', { error: error.message });
    next(error);
  }
};
