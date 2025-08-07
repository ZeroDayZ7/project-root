import { Request, Response, NextFunction } from 'express';
import type { MinimalLogger } from 'types/logger.js';
import { v4 as uuidv4 } from 'uuid';

interface RequestLoggerOptions {
  logger: MinimalLogger;
  isDev: boolean;
}

export function requestLoggerDev({ logger, isDev }: RequestLoggerOptions) {
  if (!isDev) {
    return (req: Request, res: Response, next: NextFunction): void => {
      next();
    };
  }

  const log = logger.info ? logger.info.bind(logger) : console.log;

  return (req: Request, res: Response, next: NextFunction): void => {
    const requestId = uuidv4(); // Generuj unikalne ID żądania
    // (req as any).requestId = requestId; // Tymczasowow
    // req.requestId = requestId;


    const start = process.hrtime();

    log(`\n==================== 📥 REQUEST [${requestId}] ====================`);
    log(`🔹 ID: ${requestId}`);
    log(`🔹 Method: ${req.method}`);
    log(`🔹 URL: ${req.originalUrl}`);
    log(`🔹 IP: ${req.ip}`);
    log(`🔹 Request ID: ${requestId}`);
    log('🔹 Headers:', JSON.stringify(req.headers, null, 2));
    log('🔹 Query:', JSON.stringify(req.query, null, 2));
    log('🔹 Params:', JSON.stringify(req.params, null, 2));
    log('🔹 Body:', JSON.stringify(req.body, null, 2));
    log('🔹 Session:', (req as any).session ?? 'No session');
    log('====================================================');

    const originalSend = res.send;

    res.send = function (body: any): Response {
      const diff = process.hrtime(start);
      const timeMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);

      log(`\n==================== 📤 RESPONSE [${requestId}] ====================`);
      log(`🔹 Status: ${res.statusCode}`);
      log(`🔹 Response Time: ${timeMs}ms`);
      log(`🔹 Request ID: ${requestId}`);
      log('🔹 Headers:', JSON.stringify(res.getHeaders(), null, 2));
      try {
        const bodyStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);
        log('🔹 Body:', bodyStr);
      } catch {
        log('🔹 Body: [Cannot stringify response body]');
      }
      log('====================================================\n');

      return originalSend.call(res, body);
    };

    next();
  };
}