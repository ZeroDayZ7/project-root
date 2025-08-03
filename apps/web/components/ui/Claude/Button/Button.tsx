// components/Button.tsx
'use client';

import React, { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { ButtonProps } from './button.types';
import { useButtonStyles } from './useButtonStyles';
import { LoadingSpinner } from './LoadingSpinner';

// Combine ButtonProps with MotionProps for smooth animations
type AnimatedButtonProps = ButtonProps &
  Omit<MotionProps, 'children' | 'onClick' | 'onFocus' | 'onBlur'>;

export const Button = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      color = 'blue',
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      type = 'button',
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      onClick,
      ...props
    },
    ref,
  ) => {
    const buttonStyles = useButtonStyles(
      variant,
      size,
      color,
      fullWidth,
      disabled,
      isLoading,
    );

    const isDisabled = disabled || isLoading;

    // Determine spinner size based on button size
    const spinnerSize =
      size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'md';

    // Animation variants for smooth interactions
    const buttonVariants = {
      initial: { scale: 1 },
      tap: { scale: 0.95 },
      hover: { scale: 1.02 },
    };

    return (
      <motion.button
        ref={ref}
        className={`${buttonStyles} ${className}`}
        disabled={isDisabled}
        type={type}
        aria-label={
          ariaLabel || (typeof children === 'string' ? children : undefined)
        }
        aria-describedby={ariaDescribedby}
        aria-disabled={isDisabled}
        onClick={onClick}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isDisabled ? 'hover' : undefined}
        whileTap={!isDisabled ? 'tap' : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Left Icon */}
        {leftIcon && !isLoading && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <LoadingSpinner size={spinnerSize} className="flex-shrink-0" />
        )}

        {/* Button Content */}
        <span className={isLoading ? 'opacity-70' : ''}>{children}</span>

        {/* Right Icon */}
        {rightIcon && !isLoading && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Screen reader feedback for loading state */}
        {isLoading && <span className="sr-only">Loading...</span>}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
