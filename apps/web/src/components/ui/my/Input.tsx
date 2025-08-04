import React from 'react';

interface InputProps {
  id?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isInvalid?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  size = 'md',
  variant = 'primary',
  disabled = false,
  isInvalid = false,
  ariaLabel,
  ariaDescribedBy,
  name,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const variantStyles = {
    primary: 'border-foreground/50 focus:border-foreground font-mono',
    secondary: 'border-foreground/30 focus:border-foreground/70 font-mono',
  };

  const baseStyles =
    'w-full rounded border text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <>
      <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          box-shadow: 0 0 0px 1000px #000 inset !important;
          -webkit-text-fill-color: var(--foreground) !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
          isInvalid ? 'border-red-500' : ''
        } ${className}`}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-invalid={isInvalid}
        name={name}
      />
    </>
  );
};

export default Input;
