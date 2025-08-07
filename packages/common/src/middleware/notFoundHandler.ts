import { Request, Response, NextFunction } from 'express';
import type { MinimalLogger } from '../types/logger.js';

interface NotFoundHandlerOptions {
  serviceName?: string;
  isDev?: boolean;
  logger?: MinimalLogger;
}

export function notFoundHandler(options: NotFoundHandlerOptions = {}) {
  const { serviceName = '', isDev = false, logger = console } = options;

  return (_req: Request, res: Response, _next: NextFunction) => {
    const message = isDev && serviceName ? `[${serviceName}] Not Found` : 'Not Found';

    logger.warn?.(`[${serviceName || 'service'}] 404 - ${_req.method} ${_req.originalUrl} - IP: ${_req.ip}`);

    res.status(404).json({ message });
  };
}
