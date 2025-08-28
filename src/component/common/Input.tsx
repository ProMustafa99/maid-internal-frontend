import React, { forwardRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  fullWidth?: boolean;
  helperText?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      size = 'md',
      variant = 'default',
      fullWidth = true,
      helperText,
      required = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-3 py-3 text-sm',
      lg: 'px-4 py-4 text-base',
    };

    const variantClasses = {
      default: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
      outlined: 'border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
      filled: 'border-gray-300 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500',
    };

    const errorClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : variantClasses[variant];

    const baseClasses = `
      block w-full border rounded-xl shadow-sm placeholder-gray-400 
      focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200
      ${sizeClasses[size]}
      ${errorClasses}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {icon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            className={`${baseClasses} ${icon ? 'pl-10' : ''}`}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
