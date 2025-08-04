'use client';
import { Button } from '@/components/ui/shadcn/button';

const variants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
  'btn_1',
] as const;


export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8">
      <h1 className="text-2xl font-bold mb-4">Test Button Variants</h1>
      <div className="flex gap-4 flex-wrap">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant} Button
          </Button>
        ))}
      </div>
    </div>
  );
}
