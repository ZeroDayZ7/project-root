import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pl', 'en'], // Obsługiwane języki
  defaultLocale: 'pl', // Domyślny język
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Dopasuj wszystkie trasy, z wyjątkiem API i statycznych zasobów
};