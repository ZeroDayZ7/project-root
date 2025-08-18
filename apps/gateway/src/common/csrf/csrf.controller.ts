import { Request, Response, NextFunction } from 'express';
import { generateCsrfToken } from './csrf.utils.ts';
import { logger } from '@zerodayz7/common';
// import { promisify } from 'util';

export const getCsrfToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // SystemLog.warn(`[CSRF CONTROLLER] TOKEN: ${req.session.csrfToken}`);
    if (!req.session) {
      throw new Error('SESSION_NOT_INITIALIZED');
    }
    // SystemLog.warn(`[CSRF CONTROLLER] SESSION ID: ${req.session.id}`);
    const token = generateCsrfToken();
    req.session.csrfToken = token;
    // const saveSession = promisify(req.session.save.bind(req.session));
    // await saveSession();

    // SystemLog.info('[CSRF CONTROLLER] Wygenerowano i zapisano token CSRF:');
    // SystemLog.warn(`[CSRF CONTROLLER] TOKEN: ${token}`);
    // SystemLog.warn(`[CSRF CONTROLLER] SESSION TOKEN: ${req.session.csrfToken}`);
    // SystemLog.warn(`[CSRF CONTROLLER] SESSION ID: ${req.session.id}`);
    res.json({ csrfToken: token });
  } catch (error: any) {
    logger.error('[CSRF CONTROLLER] Błąd podczas wysyłania tokena CSRF', {
      error: error.message,
      stack: error.stack,
    });
    next(error);
  }
};