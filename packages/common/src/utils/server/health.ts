export interface HealthStatus {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptime: number;
  environment: string;
  pid: number;
  memory: {
    used: string;
    total: string;
    percentage: string;
    rss: string;
    external: string;
  };
  cpu?: {
    user: number;
    system: number;
  };
}

export function getHealthStatus(): HealthStatus {
  const memUsage = process.memoryUsage();
  const usedMemMB = memUsage.heapUsed / 1024 / 1024;
  const totalMemMB = memUsage.heapTotal / 1024 / 1024;
  const rssMB = memUsage.rss / 1024 / 1024;
  const externalMB = memUsage.external / 1024 / 1024;

  const memoryPercentage = (usedMemMB / totalMemMB) * 100;
  const status: 'ok' | 'degraded' = memoryPercentage > 90 ? 'degraded' : 'ok';

  let cpuUsage;
  try {
    cpuUsage = process.cpuUsage();
  } catch {}

  return {
    status,
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    environment: process.env.NODE_ENV || 'unknown',
    pid: process.pid,
    memory: {
      used: `${usedMemMB.toFixed(1)} MB`,
      total: `${totalMemMB.toFixed(1)} MB`,
      percentage: `${memoryPercentage.toFixed(1)}%`,
      rss: `${rssMB.toFixed(1)} MB`,
      external: `${externalMB.toFixed(1)} MB`
    },
    ...(cpuUsage && {
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      }
    })
  };
}
