'use client';
import { useState } from 'react';
import { lastChanges, additionalChanges } from './constants';
import { getPriorityColor, getStatusColor } from './utils';

export default function SystemUpdates() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-bold text-accent-foreground mb-4 flex items-center">
        <span className="mr-2">{'>'}</span> OSTATNIE ZMIANY
      </h3>
      <div className="space-y-2 text-xs">
        {(showMore ? [...lastChanges, ...additionalChanges] : lastChanges).map(
          (item, index) => (
            <div
              key={index}
              className="border-l-2 border-foreground/30 pl-3 py-1"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-primary-foreground">{item.event}</div>
                  <div className="text-foreground/70 text-xs">{item.date}</div>
                </div>
                <div className="text-right ml-2">
                  <div className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </div>
                  <div className={`text-xs ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 w-full text-center text-accent-foreground hover:text-accent-foreground/70 text-sm border border-cyan-400/30 rounded p-2 transition-colors"
      >
        {showMore ? '▲ POKAŻ MNIEJ' : '▼ POKAŻ WIĘCEJ'}
      </button>
    </div>
  );
}
