// routes/health.route.ts
import { Router, Request, Response } from "express";
import { isShuttingDown } from "../../utils/server/shutdown.ts";
import { getHealthStatus } from "./health.service.js";
import { HealthStatus } from "./health.types.js";

export const healthRouter: Router = Router();

/**
 * GET /healthz
 * Zwraca status zdrowia serwisu
 * @returns {HealthStatus} JSON z informacjami o stanie serwisu
 * Status 200: serwis OK
 * Status 503: serwis w trakcie zamykania
 */
healthRouter.get("/", (_req: Request, res: Response<HealthStatus>) => {
  const status = getHealthStatus();
  if (isShuttingDown()) {
    return res.status(503).json(status);
  }
  return res.status(200).json(status);
});
