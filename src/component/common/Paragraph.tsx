import React from 'react';

export interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted' | 'white';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  uppercase?: boolean;
  underline?: boolean;
  italic?: boolean;
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  spacing?: 'tight' | 'normal' | 'wide';
  as?: 'p' | 'span' | 'div';
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = '',
  size = 'md',
  weight = 'normal',
  color = 'default',
  align = 'left',
  truncate = false,
  uppercase = false,
  underline = false,
  italic = false,
  leading = 'normal',
  spacing = 'normal',
  as = 'p',
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
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
    white: 'text-white',
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Line height classes
  const leadingClasses = {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  // Letter spacing classes
  const spacingClasses = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
  };

  // Build the class string
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    leadingClasses[leading],
    spacingClasses[spacing],
    truncate && 'truncate',
    uppercase && 'uppercase',
    underline && 'underline',
    italic && 'italic',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render the appropriate element
  const renderElement = () => {
    const props = {
      className: classes,
      children,
    };

    switch (as) {
      case 'span':
        return <span {...props} />;
      case 'div':
        return <div {...props} />;
      case 'p':
      default:
        return <p {...props} />;
    }
  };

  return renderElement();
};

export default Paragraph;
