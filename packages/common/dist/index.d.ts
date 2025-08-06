import { Request, Response, NextFunction, Application } from 'express';
import { CorsOptions } from 'cors';
import { HelmetOptions } from 'helmet';
import * as express_rate_limit from 'express-rate-limit';

declare const requestLoggerDev: (req: Request, res: Response, next: NextFunction) => void;

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

export { globalRateLimiter, requestLoggerDev, setupCommonMiddleware, setupErrorHandling };
