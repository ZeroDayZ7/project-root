'use client';

import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard: FC<DashboardCardProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        'border border-white/20 rounded-lg p-4 shadow-md',
        className
      )}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};
