import env from './config/env.js';
import { globalErrorHandler, logger, notFoundHandler, setupCommonMiddleware } from '@zerodayz7/common';

import { requestLoggerDev } from '@zerodayz7/common';
import router from './routes/index.ts';

const app = setupCommonMiddleware();
app.use(
  requestLoggerDev({
    logger,
    isDev: env.NODE_ENV === 'development',
  }),
);
app.use(router);

// Obsługa 404
app.use(
  notFoundHandler({
    serviceName: env.NAME,
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);

// Obsługa błędów
app.use(
  globalErrorHandler({
    serviceName: env.NAME,
    isDev: env.NODE_ENV === 'development',
    logger,
  }),
);

export default app;
