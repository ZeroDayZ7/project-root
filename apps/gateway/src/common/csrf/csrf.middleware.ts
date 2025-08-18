// middleware/csrf.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '@zerodayz7/common';

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (['GET', 'HEAD'].includes(req.method)) return next();

  const clientToken = req.headers['x-csrf-token']?.toString() || '';
  const sessionToken = req.session?.csrfToken || '';

  if (!clientToken || !sessionToken) {
    throw new Error('CSRF_MISSING_TOKEN');
  }

  if (clientToken !== sessionToken) {
    throw new Error('CSRF_TOKEN_INVALID');
  }

  logger.info('[CSRF Middleware] Token CSRF zweryfikowany');
  next();
};
