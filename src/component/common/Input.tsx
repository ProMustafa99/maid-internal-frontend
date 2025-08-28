import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'size' | 'error' | 'helperText'> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  helperText?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      size = 'medium',
      variant = 'outlined',
      fullWidth = true,
      helperText,
      required = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <TextField
        ref={ref}
        label={label}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        error={!!error}
        helperText={error || helperText}
        className={className}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f8fafc',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
              transform: 'translateY(-1px)',
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)',
            },
            '& fieldset': {
              borderColor: error ? '#ef4444' : '#e2e8f0',
              borderWidth: '2px',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: error ? '#ef4444' : '#3b82f6',
              borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? '#ef4444' : '#3b82f6',
              borderWidth: '3px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#64748b',
            fontWeight: '500',
            fontSize: '0.875rem',
            '&.Mui-focused': {
              color: error ? '#ef4444' : '#3b82f6',
              fontWeight: '600',
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
            '&.Mui-error': {
              color: '#ef4444',
              fontWeight: '600',
            },
          },
          '& .MuiInputBase-input': {
            padding: size === 'small' ? '12px 16px' : '16px 20px',
            fontSize: size === 'small' ? '0.875rem' : '1rem',
            fontWeight: '500',
            color: '#1e293b',
            '&::placeholder': {
              color: '#94a3b8',
              opacity: 1,
            },
          },
        }}
        InputProps={{
          startAdornment: icon ? (
            <div className="mr-3 text-gray-400">
              {icon}
            </div>
          ) : undefined,
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
