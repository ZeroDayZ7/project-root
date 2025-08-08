'use client';
import Link from 'next/link';
import { AudioPlayer } from '@/components/AudioPlayer/AudioPlayer';
import { prefix } from '@lib/prefix';

export default function SystemInfo() {
  return (
    <div className="space-y-6">
      {/* Terminal Window */}
      {/* <div className="border border-foreground/30 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="ml-4 text-xs text-card-foreground">
            terminal v2.1.0
          </span>
        </div>
        <div className="text-sm">
          <div className="text-card-foreground">user@kasandra:~$ status</div>
          <div className="text-secondary-foreground mt-2">
            ACCESSING KASANDRA NEURAL NETWORK...
            <span className="text-green-400/30">|</span>
          </div>
          <div className="text-primary-foregound/20 mt-4">
            <div>• System operacyjny: SECURED</div>
            <div>• Połączenia: 1,247 aktywnych</div>
            <div>
              • Status bezpieczeństwa:{' '}
              <span className="text-green-400">OPTIMAL</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Government Links */}
      {/* <div className="border border-foreground/30 rounded-lg p-4">
        <h3 className="text-lg font-bold text-accent-foreground mb-4 flex items-center">
          <span className="mr-2">{'>'}</span> ŁĄCZA
        </h3>
        <div className="space-y-2 text-sm">
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block text-card-foreground hover:text-card-foreground/70 transition-colors"
          >
            • Centrum Bezpieczeństwa
          </Link>
          <Link
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block text-card-foreground hover:text-card-foreground/70 transition-colors"
          >
            • Urząd Skarbowy
          </Link>
          <Link
            href="/test/"
            // onClick={(e) => e.preventDefault()}
            className="block text-card-foreground hover:text-card-foreground/70 transition-colors"
          >
            • Test
          </Link>
        </div>
      </div> */}

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
