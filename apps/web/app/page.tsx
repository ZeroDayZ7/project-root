'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@neo/ui';
import { AppBrand } from '@/components/AppBrand';
import { AudioPlayer } from '@/components/AudioPlayer/AudioPlayer';
import { prefix } from '@/lib/prefix';

// Helper to generate static matrix rain
function generateMatrixRain(cols = 20, rows = 40) {
  return Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () =>
      String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
    )
  );
}

export default function HomePage() {
  const [loginStep, setLoginStep] = useState('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Generate matrix rain ONCE (static)
  const matrixRain = generateMatrixRain();

  // Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      setIsValidEmail(true);
      setLoginStep('password');
    }
  };

  const handlePasswordSubmit = () => {
    if (password.length > 0) {
      setLoginStep('success');
    }
  };

  const lastChanges = [
    { date: '2025-07-25', event: 'Nowe przepisy cyberbezpieczeństwa', status: 'AKTYWNE', priority: 'HIGH' },
    { date: '2025-07-24', event: 'Aktualizacja systemu PESEL', status: 'W TRAKCIE', priority: 'MEDIUM' },
    { date: '2025-07-23', event: 'Zmiana przepisów podatkowych', status: 'ZAKOŃCZONE', priority: 'LOW' },
    { date: '2025-07-22', event: 'Alert bezpieczeństwa narodowego', status: 'AKTYWNE', priority: 'CRITICAL' },
    { date: '2025-07-21', event: 'Modernizacja infrastruktury IT', status: 'PLANOWANE', priority: 'MEDIUM' },
    { date: '2025-07-20', event: 'Nowy protokół uwierzytelniania', status: 'TESTOWANIE', priority: 'HIGH' },
    { date: '2025-07-19', event: 'Integracja z systemami UE', status: 'W TRAKCIE', priority: 'HIGH' },
    { date: '2025-07-18', event: 'Backup systemów krytycznych', status: 'ZAKOŃCZONE', priority: 'CRITICAL' },
    { date: '2025-07-17', event: 'Szkolenie personelu', status: 'PLANOWANE', priority: 'LOW' },
    { date: '2025-07-16', event: 'Audit bezpieczeństwa', status: 'W TRAKCIE', priority: 'HIGH' },
  ];

  const additionalChanges = [
    { date: '2025-07-15', event: 'Implementacja AI w administracji', status: 'TESTOWANIE', priority: 'HIGH' },
    { date: '2025-07-14', event: 'Nowe API dla deweloperów', status: 'AKTYWNE', priority: 'MEDIUM' },
    { date: '2025-07-13', event: 'Modernizacja serwerów', status: 'ZAKOŃCZONE', priority: 'CRITICAL' },
    { date: '2025-07-12', event: 'Aktualizacja protokołów szyfrowania', status: 'AKTYWNE', priority: 'HIGH' },
    { date: '2025-07-11', event: 'Nowe procedury weryfikacji', status: 'PLANOWANE', priority: 'MEDIUM' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'text-red-400';
      case 'HIGH': return 'text-orange-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-green-400';
      default: return 'text-cyan-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AKTYWNE': return 'text-green-400';
      case 'W TRAKCIE': return 'text-yellow-400';
      case 'ZAKOŃCZONE': return 'text-gray-400';
      case 'PLANOWANE': return 'text-blue-400';
      case 'TESTOWANIE': return 'text-purple-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Static Matrix rain background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none z-0">
        <div className="flex h-full">
          {matrixRain.map((col, i) => (
            <div key={i} className="flex flex-col flex-1 items-center">
              {col.map((char, j) => (
                <div
                  key={j}
                  className="text-green-400 text-xs opacity-20"
                  style={{}}
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <AppBrand />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - System Info */}
          <div className="space-y-6">
            {/* Terminal Window */}
            <div className="bg-black/80 border border-green-400/30 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-xs text-green-400/70">terminal v2.1.0</span>
              </div>
              <div className="text-sm">
                <div className="text-green-400">user@kasandra:~$ status</div>
                <div className="text-cyan-400 mt-2">
                  ACCESSING KASANDRA NEURAL NETWORK...<span className="text-green-400/30">|</span>
                </div>
                <div className="text-green-300 mt-4">
                  <div>• System operacyjny: SECURED</div>
                  <div>• Połączenia: 1,247 aktywnych</div>
                  <div>• Ostatnia aktualizacja: 25.07.2025</div>
                  <div>• Status bezpieczeństwa: <span className="text-green-400">OPTIMAL</span></div>
                </div>
              </div>
            </div>

            {/* Government Links */}
            <div className="bg-black/80 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                <span className="mr-2">{'>'}</span> ŁĄCZA RZĄDOWE
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-green-300 hover:text-green-400 transition-colors">
                  • Centrum Bezpieczeństwa
                </Link>
                <Link href="#" className="block text-green-300 hover:text-green-400 transition-colors">
                  • Urząd Skarbowy
                </Link>
                <Link href="#" className="block text-green-300 hover:text-green-400 transition-colors">
                  • ZUS Online
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black/80 border border-green-400/30 rounded-lg p-4">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                <span className="mr-2">{'>'}</span> SZYBKIE AKCJE
              </h3>
              <div className="space-y-3">
                <AudioPlayer
                  audioSrc={`${prefix}/audio/ambient.mp3`}
                  className="w-full text-left"
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

          {/* Center Column - Login */}
          <div className="flex flex-col items-center justify-start">
            {/* System Description */}
            <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 mb-8 w-full max-w-md">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">
                SYSTEM KASANDRA
              </h2>
              <div className="text-sm text-green-300 space-y-2 text-center">
                <p>Strategiczne Centrum Bezpieczeństwa</p>
                <p className="text-xs text-green-400/70">
                  Zaawansowany system monitorowania i analizy zagrożeń
                  wykorzystujący sztuczną inteligencję do przewidywania
                  i neutralizacji potencjalnych zagrożeń bezpieczeństwa narodowego.
                </p>
              </div>
            </div>

            {/* Login System */}
            <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 w-full max-w-md">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-cyan-400">DOSTĘP DO SYSTEMU</h3>
                <div className="text-xs text-green-400/70 mt-2">
                  Uwierzytelnianie wielopoziomowe aktywne
                </div>
              </div>

              {loginStep === 'initial' && (
                <div className="space-y-4">
                  <button
                    onClick={() => setLoginStep('email')}
                    className="w-full bg-green-400/20 hover:bg-green-400/30 border border-green-400 rounded p-3 text-green-400 font-bold transition-colors duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">INICJUJ LOGOWANIE</span>
                  </button>
                  <button className="w-full bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 rounded p-3 text-cyan-400 transition-colors duration-300">
                    REJESTRACJA NOWEGO UŻYTKOWNIKA
                  </button>
                </div>
              )}

              {loginStep === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-green-400 mb-2">
                      {'>'} ADRES EMAIL:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border border-green-400/50 rounded p-3 text-green-400 focus:border-green-400 focus:outline-none font-mono"
                      placeholder="user@example.com"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!validateEmail(email)}
                    className="w-full bg-green-400/20 hover:bg-green-400/30 border border-green-400 rounded p-3 text-green-400 font-bold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    WERYFIKUJ EMAIL
                  </button>
                  <button
                    onClick={() => setLoginStep('initial')}
                    className="w-full text-green-400/70 hover:text-green-400 text-sm transition-colors"
                  >
                    ← POWRÓT
                  </button>
                </div>
              )}

              {loginStep === 'password' && (
                <div className="space-y-4">
                  <div className="text-sm text-green-400 mb-4">
                    Email zweryfikowany: <span className="text-cyan-400">{email}</span>
                  </div>
                  <div>
                    <label className="block text-sm text-green-400 mb-2">
                      {'>'} HASŁO DOSTĘPU:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/50 border border-green-400/50 rounded p-3 text-green-400 focus:border-green-400 focus:outline-none font-mono"
                      placeholder="••••••••"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={password.length === 0}
                    className="w-full bg-green-400/20 hover:bg-green-400/30 border border-green-400 rounded p-3 text-green-400 font-bold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    AUTORYZUJ DOSTĘP
                  </button>
                  <button
                    onClick={() => setLoginStep('email')}
                    className="w-full text-green-400/70 hover:text-green-400 text-sm transition-colors"
                  >
                    ← ZMIEŃ EMAIL
                  </button>
                </div>
              )}

              {loginStep === 'success' && (
                <div className="text-center space-y-4">
                  <div className="text-green-400 text-lg">
                    ✅ DOSTĘP AUTORYZOWANY
                  </div>
                  <div className="text-sm text-green-400/70">
                    Przekierowanie do panelu głównego...
                  </div>
                  <div className="text-cyan-400">
                    ŁADOWANIE INTERFEJSU...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - System Updates */}
          <div className="space-y-6">
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
                        <div className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </div>
                        <div className={`text-xs ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </div>
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

            {/* System Status */}
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
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-green-400/50">
          <div>KASANDRA SYSTEM v3.2.1 | OSTATNIA AKTUALIZACJA: 25.07.2025</div>
          <div className="mt-2">
            CLASSIFIED: POZIOM DOSTĘPU WYMAGANY | MONITORING AKTYWNY
          </div>
        </div>
      </div>
    </div>
  );
}
