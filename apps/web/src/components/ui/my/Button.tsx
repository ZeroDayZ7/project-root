import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
  ariaLabel?: string;
  ariaBusy?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  size = 'md',
  variant = 'primary',
  disabled = false,
  isLoading = false,
  ariaLabel,
  ariaBusy,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const variantStyles = {
    primary:
      'rounded border border-foreground bg-foreground/20 font-bold text-foreground hover:bg-foreground/30 focus-visible:bg-foreground/30',
    secondary: 'text-foreground/70 hover:text-foreground',
  };

  const baseStyles =
    'transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading ? 'true' : 'false'}
    >
      {isLoading ? 'Wczytywanie...' : children}
    </button>
  );
};

export default Button;
