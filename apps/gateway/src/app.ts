import express from 'express';
// import morgan from 'morgan';
import helmetMiddleware from './middleware/helmet.middleware.js';
import { corsMiddleware } from './middleware/cors.middleware.js';
import swaggerMiddleware from './middleware/swagger.middleware.js';
import { requestLoggerDev } from './middleware/requestLogger.middleware.js';

// import healthRouter from './routes/health.route.js';
// import metricsRouter from './routes/metrics.route.js';

import logger from './utils/logger.js';
import env from './config/env.js';
import { globalRateLimiter, loginRateLimiter, registerRateLimiter } from './config/rateLimiters.config.js';

import authProxyRouter from './proxies/authProxy.js';
import { loadRoutes } from './loaders/routerLoader.js';

const app = express();

// if (process.env.NODE_ENV === 'development') {
//   app.use(requestLoggerDev);
// }


// Middleware
app.use(helmetMiddleware);        // bezpieczeństwo nagłówków
app.use(globalRateLimiter); // globalny rate limiter
app.use(corsMiddleware); // obsługa CORS
app.use(express.json({ limit: '1mb' })); // parsowanie JSON w body z limitem
// app.use(morgan('combined')); // logowanie requestów (opcjonalnie)

app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

app.use('/api/auth/login', loginRateLimiter, authProxyRouter);
app.use('/api/auth/register', registerRateLimiter, authProxyRouter);

app.use('/api-docs', ...swaggerMiddleware);
// await loadRoutes(app); // dynamiczne ładowanie tras
// app.use('/health', healthRouter);
// app.use('/metrics', metricsRouter);

await loadRoutes(app); // Automatyczne ładowanie wszystkiego z /routes

// loadRoutes(app).then(() => {
//   console.log('All routes loaded');
// });


// Obsługa błędów
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error: %o', err); // %o - obiekt z info o błędzie
  const status = err.status || 500;
  const isDev = env.NODE_ENV === 'development';
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    ...(isDev && { stack: err.stack }) // stack trace tylko w dev
  });
});

export default app;
