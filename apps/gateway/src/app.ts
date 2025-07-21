import express from 'express';
// import morgan from 'morgan';
import rateLimitMiddleware from './middleware/rateLimit.middleware.js';
import helmetMiddleware from './middleware/helmet.middleware.js';
import { corsMiddleware } from './middleware/cors.middleware.js';
import swaggerMiddleware from './middleware/swagger.middleware.js';
import { requestLoggerDev } from './middleware/requestLogger.middleware.js';

// import healthRouter from './routes/health.route.js';
// import metricsRouter from './routes/metrics.route.js';

import logger from './utils/logger.js';

import authProxyRouter from './proxies/authProxy.js';
import { loadRoutes } from './loaders/routerLoader.js';

const app = express();

// if (process.env.NODE_ENV === 'development') {
//   app.use(requestLoggerDev);
// }


// Middleware
app.use(helmetMiddleware);        // bezpieczeństwo nagłówków
app.use(rateLimitMiddleware); // ograniczenie liczby żądań
app.use(corsMiddleware); // obsługa CORS
app.use(express.json()); // parsowanie JSON w body
// app.use(morgan('combined')); // logowanie requestów (opcjonalnie)

app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});


app.use('/api-docs', ...swaggerMiddleware);
// await loadRoutes(app); // dynamiczne ładowanie tras
// app.use('/health', healthRouter);
// app.use('/metrics', metricsRouter);
app.use('/api/auth', authProxyRouter);

await loadRoutes(app); // Automatyczne ładowanie wszystkiego z /routes

// loadRoutes(app).then(() => {
//   console.log('All routes loaded');
// });


// Obsługa błędów
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error: %o', err); // %o - obiekt z info o błędzie
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
