'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface FormLabelProps {
  htmlFor: string;
  children: ReactNode;
  className?: string;
  describedBy?: string; // zamiast aria-describedby
}

export default function Label({ htmlFor, children, className, describedBy }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('mb-2 block text-sm font-medium text-foreground', className)}
      aria-describedby={describedBy}
    >
      {children}
    </label>
  );
}
