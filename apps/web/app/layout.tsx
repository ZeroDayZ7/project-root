import { metadata } from '@/config/metadata';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export { metadata };

import './globals.css';
import ThemeSwitcher from '@/components/themes/ThemeSwitcher';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <NextThemesProvider
          attribute="class" // klasa motywu będzie dodana do <html>
          defaultTheme="kasandra" // domyślny motyw
          enableSystem={false} // wyłącz tryb systemowy (lub ustaw true jeśli chcesz)
          themes={['light', 'dark', 'kasandra']}
        >
          <div className='m-4'>
            {/* <ThemeSwitcher /> */}
          </div>
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}
