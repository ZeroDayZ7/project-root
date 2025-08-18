// common/src/errors/globalErrorHandler.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger.ts';

interface ErrorHandlerOptions {
  serviceName?: string;
  isDev?: boolean;
}

export function globalErrorHandler(options: ErrorHandlerOptions = {}) {
  logger.info(`🔧 Initializing 500 global error handler`);
  const { serviceName = '', isDev = false } = options;

  // UWAGA: 4 parametry są wymagane, żeby Express rozpoznał to jako error middleware
  return (
    err: Error & { status?: number },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const status = typeof err.status === 'number' ? err.status : 500;

    const payload: Record<string, unknown> = {
      message: err.message || 'Internal Server Error',
    };

    if (serviceName) payload.service = serviceName;
    if (isDev && err.stack) payload.stack = err.stack;

    res.status(status).json(payload);
  };
}
