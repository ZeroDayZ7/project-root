// ui/InlineLoader.tsx

import { Loader } from './loader-base.tsx';

// Możemy pozwolić na przekazanie wiadomości
interface InlineLoaderProps {
  message?: string;
  className?: string;
}

export const InlineLoader = ({ message, className }: InlineLoaderProps) => (
  <Loader
    fullscreen={false} // Jawnie ustawione dla czytelności
    size="w-6 h-6" // Domyślny, mniejszy rozmiar
    message={message}
    className={className}
  />
);