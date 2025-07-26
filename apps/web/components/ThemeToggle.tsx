'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@neo/ui';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
};

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Przełącz motyw</span>
    </Button>
  );
}
