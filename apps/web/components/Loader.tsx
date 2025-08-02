// components/Loader.tsx
'use client';
import React from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center p-4 border border-foreground/30 rounded-lg ${className}`}
    >
      <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin" />
    </div>
  );
};