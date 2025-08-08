'use client';

import { useInitialStep } from './useInitialStep';
import Button from '@/components/ui/my/Button';

export default function InitialStep() {
  const { handleStart } = useInitialStep();

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={handleStart}
        ariaLabel="Rozpocznij logowanie"
      >
        Rozpocznij logowanie
      </Button>
    </div>
  );
}
 