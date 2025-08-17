export interface HealthStatus {
  status: 'ok' | 'shutting_down';
  uptime: number;      // ile sekund działa proces
  timestamp: number;   // kiedy generowana odpowiedź
  message?: string;    // opcjonalny komunikat
}
