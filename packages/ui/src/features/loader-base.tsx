// ui/loader-base.tsx

import { clsx } from 'clsx'; // Popularna biblioteka do warunkowego łączenia klas CSS

// Definiujemy propsy komponentu
interface LoaderProps {
  fullscreen?: boolean;
  size?: string; // np. 'w-6 h-6' lub 'w-24 h-24'
  message?: string;
  className?: string; // Do dodatkowej customizacji
}

export const Loader = ({
  fullscreen = false,
  size = 'w-8 h-8',
  message,
  className,
}: LoaderProps) => {
  // Animowana ikonka (może to być też SVG lub komponent ikony)
  const spinner = (
    <div
      // Używamy `clsx`, aby dynamicznie dodać klasy
      className={clsx(
        'animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent',
        size // Klasa z propa `size`
      )}
      role="status" // Ważne dla dostępności (ARIA)
    >
      <span className="sr-only">Ładowanie...</span>
    </div>
  );

  // Jeśli ma być na pełnym ekranie, opakowujemy go w div-overlay
  if (fullscreen) {
    return (
      <div
        className={clsx(
          'fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-background backdrop-blur-sm animate-pulse',
          className
        )}
      >
        {spinner}
        {message && <p className="mt-4 text-lg font-medium">{message}</p>}
      </div>
    );
  }

  // Wersja inline (wewnątrz innego elementu)
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {spinner}
      {message && <p>{message}</p>}
    </div>
  );
};