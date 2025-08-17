import { HealthStatus } from "./health.types.ts";
import { isShuttingDown } from "@/utils/server/shutdown.ts";

export const getHealthStatus = (): HealthStatus => {
  return {
    status: isShuttingDown() ? "shutting_down" : "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: isShuttingDown() ? "Server is shutting down" : undefined,
  };
};
