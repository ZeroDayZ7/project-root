import rateLimit from 'express-rate-limit';
import { rateLimitOptions } from '../config/rateLimit.config.js';

const rateLimitMiddleware = rateLimit(rateLimitOptions);

export default rateLimitMiddleware;
