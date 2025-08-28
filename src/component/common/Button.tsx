import React from 'react';

export interface ButtonProps {
  title: string;
  onClick: () => void;
  hasBackground?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white' | 'gray' | 'black';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  hasBackground = true,
  color = 'primary',
  size = 'md',
  variant = 'solid',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Size classes
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
    xl: 'px-6 py-3.5 text-lg',
  };

  // Color classes for different variants
  const colorClasses = {
    primary: {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      link: 'text-blue-600 hover:text-blue-700 underline focus:ring-blue-500',
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      link: 'text-gray-600 hover:text-gray-700 underline focus:ring-gray-500',
    },
    success: {
      solid: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      ghost: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
      link: 'text-green-600 hover:text-green-700 underline focus:ring-green-500',
    },
    warning: {
      solid: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
      outline: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
      ghost: 'text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
      link: 'text-yellow-600 hover:text-yellow-700 underline focus:ring-yellow-500',
    },
    error: {
      solid: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      outline: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      link: 'text-red-600 hover:text-red-700 underline focus:ring-red-500',
    },
    white: {
      solid: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      link: 'text-gray-700 hover:text-gray-900 underline focus:ring-gray-500',
    },
    gray: {
      solid: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
      outline: 'border border-gray-500 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      link: 'text-gray-700 hover:text-gray-900 underline focus:ring-gray-500',
    },
    black: {
      solid: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
      outline: 'border border-gray-900 text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-900 hover:bg-gray-50 focus:ring-gray-500',
      link: 'text-gray-900 hover:text-gray-700 underline focus:ring-gray-500',
    },
  };

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Build final classes
  const classes = [
    baseClasses,
    sizeClasses[size],
    colorClasses[color][variant],
    widthClass,
    className,
  ].filter(Boolean).join(' ');

  // Handle icon positioning
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClasses = iconPosition === 'left' ? 'mr-2' : 'ml-2';
    return (
      <span className={`${iconClasses} ${loading ? 'animate-spin' : ''}`}>
        {icon}
      </span>
    );
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ 
        backgroundColor: !hasBackground ? 'transparent' : undefined,
        color: !hasBackground ? 'inherit' : undefined,
      }}
    >
      {iconPosition === 'left' && renderIcon()}
      {loading ? 'Loading...' : title}
      {iconPosition === 'right' && renderIcon()}
    </button>
  );
};

export default Button;
