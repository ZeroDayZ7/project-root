import { validateEmail } from './utils';
import { LoginStep } from './types';

interface LoginSystemProps {
  loginStep: LoginStep;
  setLoginStep: (step: LoginStep) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isValidEmail: boolean;
  setIsValidEmail: (isValid: boolean) => void;
}

export function LoginSystem({
  loginStep,
  setLoginStep,
  email,
  setEmail,
  password,
  setPassword,
  isValidEmail,
  setIsValidEmail,
}: LoginSystemProps) {
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

  return (
    <div className="flex flex-col items-center justify-start">
      {/* System Description */}
      <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 mb-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-cyan-400 mb-4 text-center">SYSTEM KASANDRA</h2>
        <div className="text-sm text-green-300 space-y-2 text-center">
          <p>Strategiczne Centrum Bezpieczeństwa</p>
          <p className="text-xs text-green-400/70">
            Zaawansowany system monitorowania i analizy zagrożeń wykorzystujący sztuczną inteligencję do przewidywania i
            neutralizacji potencjalnych zagrożeń bezpieczeństwa narodowego.
          </p>
        </div>
      </div>

      {/* Login System */}
      <div className="bg-black/80 border border-green-400/30 rounded-lg p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-cyan-400">DOSTĘP DO SYSTEMU</h3>
          <div className="text-xs text-green-400/70 mt-2">Uwierzytelnianie wielopoziomowe aktywne</div>
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
              <label className="block text-sm text-green-400 mb-2">{'>'} ADRES EMAIL:</label>
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
              <label htmlFor="password" className="block text-sm text-green-400 mb-2">
                {'>'} HASŁO DOSTĘPU:
              </label>
              <input
                id="password"
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
            <div className="text-green-400 text-lg">✅ DOSTĘP AUTORYZOWANY</div>
            <div className="text-sm text-green-400/70">Przekierowanie do panelu głównego...</div>
            <div className="text-cyan-400">ŁADOWANIE INTERFEJSU...</div>
          </div>
        )}
      </div>
    </div>
  );
}
