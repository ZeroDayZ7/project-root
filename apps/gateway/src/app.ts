import { globalErrorHandler, globalRateLimiter, notFoundHandler, setupCommonMiddleware, setupErrorHandling } from '@neo/common';

import { corsOptions } from 'config/cors.config.js';
import { helmetOptions } from 'config/helmet.config.js';

// import morgan from 'morgan';
// import { requestLoggerDev } from '@neo/common';

// import healthRouter from './routes/health.route.js';
// import metricsRouter from './routes/metrics.route.js';

import logger from './utils/logger.js';
import env from './config/env.js';
// import { globalRateLimiter} from './config/rateLimiters.config.js';

// import { loadRoutes } from './loaders/routerLoader.js';
import routes from './routes/index.js';
// import type { HelmetOptions } from '../../../packages/common/dist/setupCommonMiddleware.js';
// import type { HelmetOptions } from '@neo/common';
const app = setupCommonMiddleware({
  cors: corsOptions,
  helmet: helmetOptions,
});

app.use(globalRateLimiter);
// if (process.env.NODE_ENV === 'development') {
//   app.use(requestLoggerDev);
// }
app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// app.use('/api/auth/login', loginRateLimiter, authProxyRouter);
// app.use('/api/auth/register', registerRateLimiter, authProxyRouter);

// app.use('/api-docs', ...swaggerMiddleware);
app.use('/api', routes);

// Obsługa 404
app.use(
  notFoundHandler({
    serviceName: 'gateway',
    isDev: env.NODE_ENV === 'development',
    logger,
}));
// Obsługa globalna błędów
app.use(
  globalErrorHandler({
    serviceName: 'gateway',
    isDev: process.env.NODE_ENV === 'development',
    logger
  })
);

export default app;
