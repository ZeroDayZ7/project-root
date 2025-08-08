import Link from 'next/link';
import Button from '@/components/ui/my/Button'; // ścieżka zależna od twojej struktury

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Strona nie znaleziona</h1>
      <p className="mb-6 text-muted-foreground">Przepraszamy, nie mogliśmy znaleźć tej strony.</p>

      <Link href="/">
        <Button variant="primary" size="md" className="max-w-xs">
          Wróć na stronę główną
        </Button>
      </Link>
    </main>
  );
}
