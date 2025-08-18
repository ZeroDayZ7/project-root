import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger.ts';

interface NotFoundHandlerOptions {
  serviceName?: string;
  isDev?: boolean;
}

export function notFoundHandler(options: NotFoundHandlerOptions = {}) {
  logger.info(`🔧 Initializing 404 not found handler...`);
  const { serviceName = '', isDev = false } = options;

  return (_req: Request, res: Response, _next: NextFunction) => {
    const message = isDev && serviceName ? `[${serviceName}] Not Found` : 'Not Found';

    logger.warn?.(`[${serviceName || 'service'}] 404 - ${_req.method} ${_req.originalUrl} - IP: ${_req.ip}`);

    res.status(404).json({ message });
  };
}
