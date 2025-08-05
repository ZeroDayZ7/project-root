import { Request, Response, NextFunction } from 'express';

declare const requestLoggerDev: (req: Request, res: Response, next: NextFunction) => void;

export { requestLoggerDev };
