// ui/SplashLoader.tsx

import { Loader } from "./loader-base.tsx";

// Ten komponent nie potrzebuje żadnych propsów, ma jedno zadanie.
export const SplashLoader = () => {
  return (
    <Loader
      fullscreen
      size="w-16 h-16" // Większy spinner
      message="Przygotowujemy aplikację..."
    />
  );
};