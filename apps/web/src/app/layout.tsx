import { metadata } from '@/config/metadata';
export { metadata };

import './globals.css';

import ClientProviders from '@/providers/ClientProviders';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
