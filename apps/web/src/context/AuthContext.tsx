// context/auth-context.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback, // Ważne: dodajemy useCallback
} from 'react';

// Zostawiamy interfejsy bez zmian
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isInitializing: boolean; // Zmieniona nazwa dla jasności: to jest stan ładowania sesji
  isLoading: boolean; // Nowy stan dla akcji typu login/logout
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

// Kontekst z wartościami domyślnymi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Główny komponent Providera
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true); // TYLKO do sprawdzania sesji przy starcie
  const [isLoading, setIsLoading] = useState(false); // Do obsługi ładowania w trakcie logowania

  // Efekt uruchamiany raz, aby sprawdzić, czy użytkownik jest już zalogowany (np. na podstawie tokena)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // --- Miejsce na Twoją prawdziwą logikę ---
        // Tutaj odpytujesz swoje API, np. /api/auth/me, aby sprawdzić token w cookie
        // const response = await fetch('/api/auth/me');
        // if (!response.ok) throw new Error('No active session');
        // const userData = await response.json();
        // setUser(userData);

        // Symulacja udanej weryfikacji po 1.5s
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setUser({ id: '1', name: 'Zalogowany User', email: 'test@example.com' });
      } catch (error) {
        // Jeśli weryfikacja się nie powiedzie, po prostu zostawiamy usera jako null
        setUser(null);
      } finally {
        // Niezależnie od wyniku, kończymy stan inicjalizacji
        setIsInitializing(false);
      }
    };

    checkUserSession();
  }, []); // Pusta tablica zależności = uruchom tylko raz

  // Funkcja logowania opakowana w useCallback dla optymalizacji
  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setIsLoading(true); // Używamy dedykowanego stanu ładowania
      try {
        // --- Logika logowania do API ---
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setUser({ id: '1', name: 'Jan Kowalski', email: credentials.email });
      } catch (err) {
        // Błędy logowania powinny być obsługiwane w formularzu,
        // tutaj rzucamy błąd, aby komponent formularza mógł go złapać
        throw new Error('Nieprawidłowe dane logowania');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  ); // Pusta tablica, bo funkcja nie zależy od stanu komponentu

  // Funkcja wylogowania
  const logout = useCallback(() => {
    // --- Logika wylogowania z API ---
    // fetch('/api/auth/logout');
    setUser(null);
  }, []);

  // Memoizowana wartość kontekstu, aby uniknąć niepotrzebnych re-renderów
  const contextValue = useMemo(
    () => ({
      user,
      isInitializing,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, isInitializing, isLoading, login, logout],
  );

  // Provider zwraca teraz TYLKO kontekst. Bez logiki renderowania!
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Hook do wygodnego korzystania z kontekstu
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth musi być używany wewnątrz AuthProvider');
  }
  return context;
};