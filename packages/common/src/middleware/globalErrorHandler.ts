import { Request, Response, NextFunction } from 'express';
import type { MinimalLogger } from '../types/logger.js';

interface ErrorHandlerOptions {
  serviceName?: string;
  isDev?: boolean;
  logger?: MinimalLogger;
}

export function globalErrorHandler(options: ErrorHandlerOptions = {}) {
  const { serviceName = '', isDev = false, logger } = options;

  // Bezpieczny logger - jeśli nie ma, to podstawiamy console.error
  const safeLogger: MinimalLogger = logger ?? {
    error: console.error.bind(console),
  };

  return (
    err: Error & { status?: number },
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    safeLogger.error?.(`[${serviceName || 'service'}] Error:`, err);
    const status = err.status || 500;

    res.status(status).json({
      message: err.message || 'Internal Server Error',
      ...(isDev ? { stack: err.stack } : {}),
    });
  };
}
