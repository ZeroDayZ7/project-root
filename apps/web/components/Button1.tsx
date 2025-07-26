import React, { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/lib/utils'; // Import your utility function for class names

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  'aria-label'?: string; // na wypadek gdy button ma tylko ikonę
}

/**
 * Profesjonalny, dostępny i stylowy komponent Button.
 */
export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled,
  loading = false,
  type = 'button',
  className,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Style dla różnych wariantów
  const baseClasses =
    'inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    ghost: 'bg-transparent text-gray-700',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading ? true : undefined}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
