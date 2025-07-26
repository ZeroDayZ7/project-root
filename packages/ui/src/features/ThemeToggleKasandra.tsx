'use client'; // WAŻNE: To musi być pierwsza linia!

import * as React from 'react';
import { Moon, Sun, OrbitIcon, MonitorCog } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/dropdown-menu'; // Upewnij się, że ścieżka jest poprawna

export function ThemeToggleKasandra() {
  // Destrukturyzujemy 'setTheme' i 'theme' z useTheme.
  // 'theme' jest potrzebne do warunkowego renderowania ikon w triggerze.
  const { theme, setTheme } = useTheme();

  // Stan do zarządzania "zamontowaniem" komponentu, aby uniknąć błędów hydracji.
  // Jest to standardowa praktyka przy użyciu useTheme w Next.js App Router.
  const [mounted, setMounted] = React.useState(false);

  // Ustawiamy mounted na true po pierwszym renderowaniu po stronie klienta.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Jeśli komponent nie jest jeszcze zamontowany po stronie klienta, nie renderujemy nic.
  // Zapobiega to niezgodnościom między renderowaniem serwerowym a klienckim.
  if (!mounted) {
    return null;
  }

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
            <OrbitIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-purple-500" />
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        {/* Opcja dla motywu Kasandra */}
        <DropdownMenuItem onClick={() => setTheme('kasandra')}>
          Kasandra
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
