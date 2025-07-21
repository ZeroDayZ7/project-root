// src/middleware/swagger.middleware.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../config/swagger.config.js';

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];

export default swaggerMiddleware;
