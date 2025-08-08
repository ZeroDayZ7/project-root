import { metadata } from '@config/metadata';
export { metadata };

import './globals.css';

import ThemeSwitcher from '@components/themes/ThemeSwitcher';
import ClientProviders from '@providers/ClientProviders';
 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body>
        <ClientProviders>
          {/* <div className='m-4'>
            <ThemeSwitcher /> 
          </div> */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
