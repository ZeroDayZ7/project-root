// hooks/useButtonStyles.ts
import { useMemo } from 'react';
import { ButtonVariant, ButtonSize, ButtonColor } from './button.types';

export const useButtonStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  color: ButtonColor = 'blue',
  fullWidth: boolean = false,
  disabled: boolean = false,
  isLoading: boolean = false,
) => {
  return useMemo(() => {
    // Base styles
    const baseStyles = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'disabled:pointer-events-none',
      fullWidth ? 'w-full' : 'w-auto',
    ];

    // Size variants
    const sizeStyles = {
      sm: ['px-3', 'py-1.5', 'text-sm', 'gap-1.5'],
      md: ['px-4', 'py-2', 'text-base', 'gap-2'],
      lg: ['px-6', 'py-3', 'text-lg', 'gap-2.5'],
      xl: ['px-8', 'py-4', 'text-xl', 'gap-3'],
    };

    // Color variants
    const colorVariants = {
      blue: {
        primary: [
          'bg-blue-600',
          'text-white',
          'hover:bg-blue-700',
          'focus:ring-blue-500',
          'active:bg-blue-800',
        ],
        secondary: [
          'bg-blue-100',
          'text-blue-700',
          'hover:bg-blue-200',
          'focus:ring-blue-500',
          'active:bg-blue-300',
        ],
        outline: [
          'border-2',
          'border-blue-600',
          'text-blue-600',
          'bg-transparent',
          'hover:bg-blue-50',
          'focus:ring-blue-500',
          'active:bg-blue-100',
        ],
        ghost: [
          'text-blue-600',
          'bg-transparent',
          'hover:bg-blue-50',
          'focus:ring-blue-500',
          'active:bg-blue-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
      green: {
        primary: [
          'bg-green-600',
          'text-white',
          'hover:bg-green-700',
          'focus:ring-green-500',
          'active:bg-green-800',
        ],
        secondary: [
          'bg-green-100',
          'text-green-700',
          'hover:bg-green-200',
          'focus:ring-green-500',
          'active:bg-green-300',
        ],
        outline: [
          'border-2',
          'border-green-600',
          'text-green-600',
          'bg-transparent',
          'hover:bg-green-50',
          'focus:ring-green-500',
          'active:bg-green-100',
        ],
        ghost: [
          'text-green-600',
          'bg-transparent',
          'hover:bg-green-50',
          'focus:ring-green-500',
          'active:bg-green-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
      red: {
        primary: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
        secondary: [
          'bg-red-100',
          'text-red-700',
          'hover:bg-red-200',
          'focus:ring-red-500',
          'active:bg-red-300',
        ],
        outline: [
          'border-2',
          'border-red-600',
          'text-red-600',
          'bg-transparent',
          'hover:bg-red-50',
          'focus:ring-red-500',
          'active:bg-red-100',
        ],
        ghost: [
          'text-red-600',
          'bg-transparent',
          'hover:bg-red-50',
          'focus:ring-red-500',
          'active:bg-red-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
      yellow: {
        primary: [
          'bg-yellow-500',
          'text-yellow-900',
          'hover:bg-yellow-600',
          'focus:ring-yellow-400',
          'active:bg-yellow-700',
        ],
        secondary: [
          'bg-yellow-100',
          'text-yellow-800',
          'hover:bg-yellow-200',
          'focus:ring-yellow-400',
          'active:bg-yellow-300',
        ],
        outline: [
          'border-2',
          'border-yellow-500',
          'text-yellow-600',
          'bg-transparent',
          'hover:bg-yellow-50',
          'focus:ring-yellow-400',
          'active:bg-yellow-100',
        ],
        ghost: [
          'text-yellow-600',
          'bg-transparent',
          'hover:bg-yellow-50',
          'focus:ring-yellow-400',
          'active:bg-yellow-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
      purple: {
        primary: [
          'bg-purple-600',
          'text-white',
          'hover:bg-purple-700',
          'focus:ring-purple-500',
          'active:bg-purple-800',
        ],
        secondary: [
          'bg-purple-100',
          'text-purple-700',
          'hover:bg-purple-200',
          'focus:ring-purple-500',
          'active:bg-purple-300',
        ],
        outline: [
          'border-2',
          'border-purple-600',
          'text-purple-600',
          'bg-transparent',
          'hover:bg-purple-50',
          'focus:ring-purple-500',
          'active:bg-purple-100',
        ],
        ghost: [
          'text-purple-600',
          'bg-transparent',
          'hover:bg-purple-50',
          'focus:ring-purple-500',
          'active:bg-purple-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
      gray: {
        primary: [
          'bg-gray-600',
          'text-white',
          'hover:bg-gray-700',
          'focus:ring-gray-500',
          'active:bg-gray-800',
        ],
        secondary: [
          'bg-gray-100',
          'text-gray-700',
          'hover:bg-gray-200',
          'focus:ring-gray-500',
          'active:bg-gray-300',
        ],
        outline: [
          'border-2',
          'border-gray-600',
          'text-gray-600',
          'bg-transparent',
          'hover:bg-gray-50',
          'focus:ring-gray-500',
          'active:bg-gray-100',
        ],
        ghost: [
          'text-gray-600',
          'bg-transparent',
          'hover:bg-gray-50',
          'focus:ring-gray-500',
          'active:bg-gray-100',
        ],
        destructive: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'active:bg-red-800',
        ],
      },
    };

    // Combine all styles
    const allStyles = [
      ...baseStyles,
      ...sizeStyles[size],
      ...colorVariants[color][variant],
      isLoading && 'relative',
      (disabled || isLoading) && 'cursor-not-allowed',
    ].filter(Boolean);

    return allStyles.join(' ');
  }, [variant, size, color, fullWidth, disabled, isLoading]);
};
