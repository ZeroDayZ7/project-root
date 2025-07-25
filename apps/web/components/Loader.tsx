// components/Loader.tsx
import React from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`flex items-center justify-center p-4 bg-purple-400/10 border border-purple-400/30 rounded-lg ${className}`}
    >
      <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};