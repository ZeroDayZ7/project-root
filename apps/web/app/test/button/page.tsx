// app/components/ButtonShowcase/page.tsx
import { Button } from '@/components/ui/Button';
import React from 'react';

// Możesz dopisać lub zaimportować VARIANTS i SIZES, jeśli nie są eksportowane z Button.tsx
const VARIANTS = [
  'primary',
  'secondary',
  'ghost',
  'destructive',
  'outline',
] as const;
const SIZES = ['sm', 'md', 'lg', 'icon'] as const;

export default function ButtonShowcasePage() {
  return (
    <main className="p-8 space-y-12">
      {VARIANTS.map((variant) => (
        <section key={variant}>
          <h2 className="mb-4 text-2xl font-semibold capitalize">
            {variant} variant
          </h2>
          <div className="flex flex-wrap gap-4">
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size}
              </Button>
            ))}
          </div>
        </section>
      ))}

      {/* Przykład z ikoną */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Buttons with icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="md" icon={<span>⭐</span>}>
            Star
          </Button>
          <Button variant="secondary" size="lg" icon={<span>🔥</span>}>
            Fire
          </Button>
        </div>
      </section>

      {/* Przykład loading */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Loading state</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="md" loading>
            Loading
          </Button>
          <Button variant="destructive" size="lg" loading>
            Loading
          </Button>
        </div>
      </section>
    </main>
  );
}
