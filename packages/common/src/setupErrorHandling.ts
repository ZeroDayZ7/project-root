import { Application, Request, Response, NextFunction } from 'express';

export function setupErrorHandling(
  app: Application,
  config?: { serviceName?: string; isDev?: boolean }
) {
  // 404 handler - używamy _req i _next bo ich nie używamy, aby uniknąć TS warnings
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: `[${config?.serviceName || 'service'}] Not Found` });
  });

  // error handler - musi mieć 4 parametry żeby Express wiedział, że to error middleware
  app.use(
    (
      err: Error & { status?: number },
      req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      console.error(`[${config?.serviceName || 'service'}] Error:`, err);
      const status = err.status || 500;
      res.status(status).json({
        message: err.message || 'Internal Server Error',
        ...(config?.isDev ? { stack: err.stack } : {}),
      });
    }
  );
}
