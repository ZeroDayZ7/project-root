'use client';

import { Loader } from '@/components/ui/Loader';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  // Dodaj inne pola użytkownika
}

interface AuthContextType {
  loading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  error: null,
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  let timer: ReturnType<typeof setTimeout>; // zdefiniuj zmienną timer w szerszym scope

  const checkAuth = async () => {
    try {
      // Przykład: zapytanie do API w celu sprawdzenia tokena
      // const response = await fetch('/api/auth/check');
      // const data = await response.json();
      // if (data.user) {
      //   setUser(data.user);
      // }
      timer = setTimeout(() => {
        setUser({ id: '1', name: 'Jan Kowalski', email: 'jan@example.com' });
        setLoading(false);
      }, 700);
    } catch (err) {
      setError('Błąd podczas ładowania danych użytkownika');
      setLoading(false);
    }
  };

  checkAuth();

  return () => clearTimeout(timer); // teraz timer jest dostępny
}, []);


  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Przykład: logowanie przez API
      // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
      // const data = await response.json();
      // setUser(data.user);
      setTimeout(() => {
        setUser({ id: '1', name: 'Jan Kowalski', email: credentials.email });
        setError(null);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Nieprawidłowe dane logowania');
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    // Przykład: wylogowanie przez API
    // fetch('/api/auth/logout');
  };

  const contextValue = useMemo(
    () => ({ loading, error, user, isAuthenticated: !!user, login, logout }),
    [loading, error, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Loader
              fullscreen
              message="Ładowanie aplikacji..."
              srMessage="Trwa ładowanie aplikacji..."
            />
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex items-center justify-center h-screen"
          >
            <div role="alert" className="text-red-500">
              {error}
              <button
                onClick={() => setError(null)}
                className="ml-4 text-blue-500 underline"
              >
                Spróbuj ponownie
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
