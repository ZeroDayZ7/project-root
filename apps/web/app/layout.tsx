import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'SYSTEM KASANDRA – STRATEGIC SECURITY CENTER',
  description:
    'SYSTEM KASANDRA to innowacyjna platforma cyfrowa dla obywateli Polski – zarządzaj dokumentami, komunikuj się z urzędami, korzystaj z usług publicznych w jednym miejscu.',
  keywords: [
    'Polska',
    'portal obywatelski',
    'usługi publiczne',
    'Project Poland',
    'dokumenty cyfrowe',
    'e-administracja',
    'platforma rządowa',
    'tożsamość cyfrowa',
    'ePUAP alternatywa',
  ],
  authors: [{ name: 'GovTech Polska', url: 'https://gov.pl' }],
  creator: 'Project Poland Team',
  publisher: 'Rzeczpospolita Polska',
  openGraph: {
    title: 'SYSTEM KASANDRA - Portal Nowej Generacji',
    description:
      'Cyfrowa transformacja administracji publicznej. Sprawdź, co Project Poland może zaoferować każdemu obywatelowi.',
    url: 'https://projectpoland.gov.pl',
    siteName: 'Project Poland',
    images: [
      {
        url: 'https://projectpoland.gov.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Project Poland - Portal Obywatelski',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYSTEM KASANDRA - Nowoczesny Portal Dla Obywateli',
    description:
      'Korzystaj z usług publicznych online, zarządzaj swoją tożsamością cyfrową - wszystko w jednym miejscu.',
    site: '@projectpoland',
    creator: '@projectpoland',
    images: ['https://projectpoland.gov.pl/twitter-og-image.jpg'],
  },
  metadataBase: new URL('https://projectpoland.gov.pl'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

   const locale = await getLocale();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className='py-4 px-10'>
          {children}
          </main>
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
