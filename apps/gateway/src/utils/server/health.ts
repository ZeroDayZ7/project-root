import env from "@/config/env.js";

/**
 * Typ zwracanego statusu health checka.
 */
export interface HealthStatus {
  status: 'ok' | 'degraded'; // DODANE: możliwość degraded status
  timestamp: string;
  uptime: number;
  version: string;
  environment: string; // DODANE
  pid: number; // DODANE
  memory: {
    used: string;
    total: string;
    percentage: string;
    // DODANE: więcej metryk pamięci
    rss: string;
    external: string;
  };
  // DODANE: CPU info jeśli dostępne
  cpu?: {
    user: number;
    system: number;
  };
}

/**
 * Zwraca aktualny status serwera.
 */
export function getHealthStatus(): HealthStatus {
  const memUsage = process.memoryUsage();
  const usedMemMB = memUsage.heapUsed / 1024 / 1024;
  const totalMemMB = memUsage.heapTotal / 1024 / 1024;
  const rssMB = memUsage.rss / 1024 / 1024;
  const externalMB = memUsage.external / 1024 / 1024;
  
  // DODANE: Sprawdzenie czy memory usage nie jest zbyt wysoki
  const memoryPercentage = (usedMemMB / totalMemMB) * 100;
  const status: 'ok' | 'degraded' = memoryPercentage > 90 ? 'degraded' : 'ok';

  // DODANE: CPU usage jeśli dostępne
  let cpuUsage;
  try {
    cpuUsage = process.cpuUsage();
  } catch {
    // cpuUsage może nie być dostępne w niektórych środowiskach
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()), // POPRAWKA: zaokrąglenie
    version: env.APP_VERSION,
    environment: process.env.NODE_ENV || 'unknown', // DODANE
    pid: process.pid, // DODANE
    memory: {
      used: `${usedMemMB.toFixed(1)} MB`, // POPRAWKA: 1 miejsce po przecinku
      total: `${totalMemMB.toFixed(1)} MB`,
      percentage: `${memoryPercentage.toFixed(1)}%`,
      rss: `${rssMB.toFixed(1)} MB`, // DODANE
      external: `${externalMB.toFixed(1)} MB` // DODANE
    },
    ...(cpuUsage && {
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      }
    })
  };
}