'use client';
import { AudioPlayer } from '@/components/AudioPlayer/AudioPlayer';
import { prefix } from '@/lib/prefix';

export default function SystemInfo() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="border border-foreground/30 rounded-lg p-4">
        <div className="space-y-3">
          <AudioPlayer
            audioSrc={`${prefix}/audio/ambient.mp3`}
          />
          <button className="w-full text-left bg-orange-400/10 hover:bg-orange-400/20 border border-orange-400/30 rounded p-2 text-sm transition-colors">
            🛑 Zgłoś błąd systemu
          </button>
          <button className="w-full text-left bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 rounded p-2 text-sm transition-colors">
            📞 Kontakt techniczny
          </button>
        </div>
      </div>
    </div>
  );
}
