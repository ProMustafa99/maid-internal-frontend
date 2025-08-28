import React from 'react';

export type HeaderLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeaderProps {
  level?: HeaderLevel;
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  uppercase?: boolean;
  underline?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  level = 'h1',
  children,
  className = '',
  size,
  weight = 'bold',
  color = 'default',
  align = 'left',
  truncate = false,
  uppercase = false,
  underline = false,
}) => {
  // Default sizes for each heading level if not specified
  const defaultSizes: Record<HeaderLevel, string> = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
  };

  // Size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
  };

  // Weight classes
  const weightClasses = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  // Color classes
  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-indigo-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    muted: 'text-gray-500',
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Build the class string
  const classes = [
    size ? sizeClasses[size] : defaultSizes[level],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    truncate && 'truncate',
    uppercase && 'uppercase',
    underline && 'underline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render the appropriate heading element
  const renderHeading = () => {
    const props = {
      className: classes,
      children,
    };

    switch (level) {
      case 'h1':
        return <h1 {...props} />;
      case 'h2':
        return <h2 {...props} />;
      case 'h3':
        return <h3 {...props} />;
      case 'h4':
        return <h4 {...props} />;
      case 'h5':
        return <h5 {...props} />;
      case 'h6':
        return <h6 {...props} />;
      default:
        return <h1 {...props} />;
    }
  };

  return renderHeading();
};

export default Header;
