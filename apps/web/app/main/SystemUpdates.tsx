import { lastChanges, additionalChanges } from './constants';
import { getPriorityColor, getStatusColor } from './utils';

interface SystemUpdatesProps {
  showMore: boolean;
  setShowMore: (show: boolean) => void;
}

export function SystemUpdates({ showMore, setShowMore }: SystemUpdatesProps) {
  return (
    <div className="bg-black/80 border border-green-400/30 rounded-lg p-4">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <span className="mr-2">{'>'}</span> OSTATNIE ZMIANY
      </h3>
      <div className="space-y-2 text-xs">
        {(showMore ? [...lastChanges, ...additionalChanges] : lastChanges).map((item, index) => (
          <div key={index} className="border-l-2 border-green-400/30 pl-3 py-1">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-green-300">{item.event}</div>
                <div className="text-green-400/70 text-xs">{item.date}</div>
              </div>
              <div className="text-right ml-2">
                <div className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</div>
                <div className={`text-xs ${getPriorityColor(item.priority)}`}>{item.priority}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 w-full text-center text-cyan-400 hover:text-cyan-300 text-sm border border-cyan-400/30 rounded p-2 transition-colors"
      >
        {showMore ? '▲ POKAŻ MNIEJ' : '▼ POKAŻ WIĘCEJ'}
      </button>
    </div>
  );
}
