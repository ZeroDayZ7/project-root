'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import DropdownMenu from '@components/ui/DropdownMenu';

const themes = [
  { id: 'light', label: 'Jasny', icon: Sun },
  { id: 'dark', label: 'Ciemny', icon: Moon },
  { id: 'kasandra', label: 'Kasandra', icon: Palette },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Zapobiega hydracji po stronie klienta
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <DropdownMenu
      items={themes}
      selectedId={theme}
      onSelect={setTheme}
      buttonLabel="Motyw"
      buttonIcon={currentTheme.icon}
      ariaLabel="Wybierz motyw kolorystyczny"
    />
  );
}
