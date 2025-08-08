import { 
  requestLoggerDev, 
  globalErrorHandler, 
  globalRateLimiter, 
  notFoundHandler, 
  setupCommonMiddleware } from '@neo/common';

import { corsOptions } from 'config/cors.config.js';
import { helmetOptions } from 'config/helmet.config.js';

import { logger } from '@neo/common';
import env from './config/env.js';
import routes from './routes/index.js';

const app = setupCommonMiddleware({
  cors: corsOptions,
  helmet: helmetOptions,
});

app.use(globalRateLimiter);
app.use(
  requestLoggerDev({
    logger,
    isDev: env.NODE_ENV === 'development',
  })
);

// app.use((req, res, next) => {
//   logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
//   next();
// });

// app.use('/api-docs', ...swaggerMiddleware);
app.use('/api', routes);

// Obsługa 404
app.use(
  notFoundHandler({
    serviceName: 'gateway',
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);
// Obsługa globalna błędów
app.use(
  globalErrorHandler({
    serviceName: 'gateway',
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);

export default app;
