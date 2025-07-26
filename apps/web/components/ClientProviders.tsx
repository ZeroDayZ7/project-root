'use client';

import { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

// Ładujemy tłumaczenia dla polskiego i angielskiego
// const messagesPl = require('../../public/locales/pl/LoginPage.json');
// const messagesEn = require('../../public/locales/en/LoginPage.json') || {};

// Formatujemy tłumaczenia, aby zawierały namespace `LoginPage`
// const formattedMessagesPl = { LoginPage: messagesPl };
// const formattedMessagesEn = { LoginPage: messagesEn };

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    console.log('Aktualna ścieżka:', pathname);
  }, [pathname]);

    // const [locale, setLocale] = useState('pl');
    // const messages = locale === 'pl' ? formattedMessagesPl : formattedMessagesEn;

  return (
    // <NextIntlClientProvider locale={locale} messages={messages}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
    // </NextIntlClientProvider>
  );
}
