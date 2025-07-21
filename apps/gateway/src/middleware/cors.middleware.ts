import cors from 'cors';
import { corsOptions } from '../config/cors.config.js';

export const corsMiddleware = cors(corsOptions);
