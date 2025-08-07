import { Request, Response, NextFunction, Application } from 'express';
import { CorsOptions } from 'cors';
import { HelmetOptions } from 'helmet';
import * as express_rate_limit from 'express-rate-limit';

interface MinimalLogger$1 {
    info: (...args: any[]) => void;
}
interface RequestLoggerOptions {
    logger: MinimalLogger$1;
    isDev: boolean;
}
declare function requestLoggerDev({ logger, isDev }: RequestLoggerOptions): (req: Request, res: Response, next: NextFunction) => void;

type AppConfig = {
    cors?: CorsOptions | any;
    helmet?: HelmetOptions | any;
};
declare function setupCommonMiddleware(config?: AppConfig): Application;

declare function setupErrorHandling(app: Application, config?: {
    serviceName?: string;
    isDev?: boolean;
}): void;

declare const globalRateLimiter: express_rate_limit.RateLimitRequestHandler;

interface MinimalLogger {
    error?: (...args: any[]) => void;
    warn?: (...args: any[]) => void;
    info?: (...args: any[]) => void;
    debug?: (...args: any[]) => void;
}

interface ErrorHandlerOptions {
    serviceName?: string;
    isDev?: boolean;
    logger?: MinimalLogger;
}
declare function globalErrorHandler(options?: ErrorHandlerOptions): (err: Error & {
    status?: number;
}, req: Request, res: Response, _next: NextFunction) => void;

interface NotFoundHandlerOptions {
    serviceName?: string;
    isDev?: boolean;
    logger?: MinimalLogger;
}
declare function notFoundHandler(options?: NotFoundHandlerOptions): (_req: Request, res: Response, _next: NextFunction) => void;

export { globalErrorHandler, globalRateLimiter, notFoundHandler, requestLoggerDev, setupCommonMiddleware, setupErrorHandling };
