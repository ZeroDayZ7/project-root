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
      <div className="border border-foreground/30 rounded-lg p-6 mb-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-accent-foreground mb-4 text-center">SYSTEM KASANDRA</h2>
        <div className="text-sm text-card-foreground space-y-2 text-center">
          <p>Strategiczne Centrum Bezpieczeństwa</p>
          <p className="text-xs text-foreground/70">
            Zaawansowany system monitorowania i analizy zagrożeń wykorzystujący sztuczną inteligencję do przewidywania i
            neutralizacji potencjalnych zagrożeń bezpieczeństwa narodowego.
          </p>
        </div>
      </div>

      {/* Login System */}
      <div className="border border-foreground/30 rounded-lg p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-">DOSTĘP DO SYSTEMU</h3>
          <div className="text-xs text-foreground/70 mt-2">Uwierzytelnianie wielopoziomowe aktywne</div>
        </div>

        {loginStep === 'initial' && (
          <div className="space-y-4">
            <button
              onClick={() => setLoginStep('email')}
              className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">INICJUJ LOGOWANIE</span>
            </button>
            <button className="w-full bg-accent-foreground/20 hover:bg-accent-foreground/30 border border-accent-foreground rounded p-3 text-accent-foreground transition-colors">
              REJESTRACJA NOWEGO UŻYTKOWNIKA
            </button>
          </div>
        )}

        {loginStep === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">{'>'} ADRES EMAIL:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus:outline-none font-mono"
                placeholder="user@example.com"
                autoFocus
              />
            </div>
            <button
              onClick={handleEmailSubmit}
              disabled={!validateEmail(email)}
              className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              WERYFIKUJ EMAIL
            </button>
            <button
              onClick={() => setLoginStep('initial')}
              className="w-full text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              ← POWRÓT
            </button>
          </div>
        )}

        {loginStep === 'password' && (
          <div className="space-y-4">
            <div className="text-sm text-foreground mb-4">
              Email zweryfikowany: <span className="text-accent-foreground">{email}</span>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-foreground mb-2">
                {'>'} HASŁO DOSTĘPU:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-foreground/50 rounded p-3 text-foreground focus:border-foreground focus:outline-none font-mono"
                placeholder="••••••••"
                autoFocus
              />
            </div>
            <button
              onClick={handlePasswordSubmit}
              disabled={password.length === 0}
              className="w-full bg-foreground/20 hover:bg-foreground/30 border border-foreground rounded p-3 text-foreground font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              AUTORYZUJ DOSTĘP
            </button>
            <button
              onClick={() => setLoginStep('email')}
              className="w-full text-foreground/70 hover:text-foreground text-sm transition-colors"
            >
              ← ZMIEŃ EMAIL
            </button>
          </div>
        )}

        {loginStep === 'success' && (
          <div className="text-center space-y-4">
            <div className="text-foreground text-lg">✅ DOSTĘP AUTORYZOWANY</div>
            <div className="text-sm text-foreground/70">Przekierowanie do panelu głównego...</div>
            <div className="text-accent-foreground">ŁADOWANIE INTERFEJSU...</div>
          </div>
        )}
      </div>
    </div>
  );
}
