import express from 'express';
import logger from './utils/logger.js';


const app = express();

// if (process.env.NODE_ENV === 'development') {
//   app.use(requestLoggerDev);
// }


// Middleware
app.use(express.json()); // parsowanie JSON w body
// app.use(morgan('combined')); // logowanie requestów (opcjonalnie)

app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});


// Obsługa błędów
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error: %o', err); // %o - obiekt z info o błędzie
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
