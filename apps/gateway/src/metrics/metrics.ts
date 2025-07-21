// src/metrics/metrics.js
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // CPU, RAM, event loop itp.

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Czas odpowiedzi HTTP w sekundach',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export { client, httpRequestDurationMicroseconds };
