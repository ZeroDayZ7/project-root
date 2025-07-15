import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppBrand } from '@/components/AppBrand';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
      <AppBrand />
      <p className="text-center max-w-md">
        Witamy w Projekcie Polska.
      </p>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}
