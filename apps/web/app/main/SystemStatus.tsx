export function SystemStatus() {
  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-4">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <span className="mr-2">{'>'}</span> STATUS SYSTEMU
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Serwery główne:</span>
          <span className="text-green-400">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Baza danych:</span>
          <span className="text-green-400">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>API Gateway:</span>
          <span className="text-green-400">ONLINE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Monitoring:</span>
          <span className="text-yellow-400">MAINTENANCE ✔</span>
        </div>
        <div className="flex justify-between">
          <span>Backup systemy:</span>
          <span className="text-green-400">STANDBY ✔</span>
        </div>
      </div>
    </div>
  );
}
