import helmet from 'helmet';
import { helmetOptions } from '../config/helmet.config.js';

const helmetMiddleware = helmet(helmetOptions);

export default helmetMiddleware;
