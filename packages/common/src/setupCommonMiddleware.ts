import express, { Application } from 'express';
import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import helmet, { HelmetOptions } from 'helmet';
export type { HelmetOptions } from 'helmet';
export type { CorsOptions } from 'cors';

type AppConfig = {
  cors?: CorsOptions | any;
  helmet?: HelmetOptions | any;
};

export function setupCommonMiddleware(config?: AppConfig): Application {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet(config?.helmet));
  app.use(cors(config?.cors));
  app.use(compression());
  // app.use(express.json({ limit: '1mb' })); 
  // app.use(express.urlencoded({ extended: true }));

  return app;
}
 

