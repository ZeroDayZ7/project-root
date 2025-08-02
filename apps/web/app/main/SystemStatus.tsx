'use client';
export function SystemStatus() {
  return (
    <div className="border border-foreground/30 rounded-lg p-4">
      <h3 className="text-lg font-bold text-accent-foreground mb-4 flex items-center">
        <span className="mr-2">{'>'}</span> STATUS SYSTEMU
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Serwery główne:</span>
          <span className="text-foreground">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Baza danych:</span>
          <span className="text-foreground">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>API Gateway:</span>
          <span className="text-foreground">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Monitoring:</span>
          <span className="text-mma">MAINTENANCE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Backup systemy:</span>
          <span className="text-foreground">STANDBY ✔</span>
        </div>
      </div>
    </div>
  );
}
