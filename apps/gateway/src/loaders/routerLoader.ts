import { Express } from 'express';
import path from 'path';
import { readdirSync } from 'fs';
import { pathToFileURL, fileURLToPath } from 'url';
import logger from '../utils/logger.js'; // lub gdzie masz logger

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadRoutes(app: Express) {
  const routesPath = path.resolve(__dirname, '../routes');

  const files = readdirSync(routesPath).filter(
    (file) => file.endsWith('.route.ts') || file.endsWith('.route.js')
  );

  for (const file of files) {
    const routePath = '/' + file.replace(/\.route\.(ts|js)$/, '');
    const filePath = path.join(routesPath, file);

    const moduleURL = pathToFileURL(filePath).href;
    const module = await import(moduleURL);
    const router = module.default;

    if (!router) {
      logger.warn(`⚠️ Route file ${file} has no default export`);
      continue;
    }

    app.use(routePath, router);
    // app.use('/api' + routePath, router);
    logger.info(`✅ Route loaded: [${routePath}] from ${file}`);
  }
}
// import { loadRoutes } from './loaders/routerLoader.js';
// await loadRoutes(app); // Automatyczne ładowanie wszystkiego z /routes

// loadRoutes(app).then(() => {
//   console.log('All routes loaded');
// });
