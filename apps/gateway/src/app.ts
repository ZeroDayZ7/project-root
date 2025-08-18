import express from 'express';
import { 
  requestLoggerDev, 
  globalErrorHandler, 
  globalRateLimiter, 
  notFoundHandler, 
  setupCommonMiddleware, 
  healthRouter,
  metricsRouter
} from '@zerodayz7/common';
import { corsOptions } from './config/cors.config.js';
import { helmetOptions } from './config/helmet.config.js';
import { logger } from '@zerodayz7/common';
import env from './config/env.js';
import routes from './routes/index.js';
import { uuidv4 } from '@zerodayz7/common';

const app = setupCommonMiddleware({
  cors: corsOptions,
  helmet: helmetOptions,
});

app.use(globalRateLimiter);
app.use(requestLoggerDev({isDev: env.NODE_ENV === 'development'}));

app.use((req, res, next) => {
  const requestId = uuidv4();
  req.headers['X-Request-ID'] = requestId; // dodajemy do nagłówków
  res.setHeader('X-Request-ID', requestId); // opcjonalnie do odpowiedzi 
  next();
});
 

app.use('/health', healthRouter);
app.use('/api', routes);

app.use(
  notFoundHandler({ serviceName: 'gateway', isDev: env.NODE_ENV === 'development', logger }),
);
app.use(
  globalErrorHandler({ serviceName: 'gateway', isDev: env.NODE_ENV === 'development', logger }),
);

// --- funkcja do uruchomienia internal metrics ---
export function startInternalMetrics(): void {
  const metricsApp = express();
  metricsApp.use('/metrics', metricsRouter);
  const METRICS_PORT = 9100;
  metricsApp.listen(METRICS_PORT, '127.0.0.1', () => {
    logger.info(`✅ Internal metrics listening on http://127.0.0.1:${METRICS_PORT}/metrics`);
  });
}

export default app;
