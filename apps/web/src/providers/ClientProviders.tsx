'use client';

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@context/AuthContext';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.log('Aktualna ścieżka:', pathname);
  }, [pathname]);
 
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="kasandra"
      enableSystem={false}
      themes={['light', 'dark', 'kasandra']}
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextThemesProvider>
  );
}
