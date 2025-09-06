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
            borderRadius: '8px',
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: error ? '#ef4444' : '#d1d5db',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: error ? '#ef4444' : '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: error ? '#ef4444' : '#3b82f6',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#6b7280',
            fontWeight: '500',
            fontSize: '0.875rem',
            backgroundColor: 'white',
            paddingLeft: '4px',
            paddingRight: '4px',
            '&.Mui-focused': {
              color: error ? '#ef4444' : '#3b82f6',
            },
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem',
            fontWeight: '500',
            marginTop: '4px',
            '&.Mui-error': {
              color: '#ef4444',
            },
          },
          '& .MuiInputBase-input': {
            padding: size === 'small' ? '12px 16px' : '16px 20px',
            fontSize: size === 'small' ? '0.875rem' : '1rem',
            fontWeight: '500',
            color: '#1f2937',
            '&::placeholder': {
              color: '#9ca3af',
              opacity: 1,
              fontSize: size === 'small' ? '0.875rem' : '1rem',
            },
          },
          // Special styling for date inputs
          '& input[type="date"]': {
            '&::-webkit-calendar-picker-indicator': {
              color: '#6b7280',
              fontSize: '1.2rem',
              cursor: 'pointer',
            },
            '&::-webkit-datetime-edit': {
              padding: '0',
            },
            '&::-webkit-datetime-edit-fields-wrapper': {
              padding: '0',
            },
            '&::-webkit-datetime-edit-text': {
              color: '#9ca3af',
              padding: '0 4px',
            },
            '&::-webkit-datetime-edit-month-field': {
              color: '#1f2937',
            },
            '&::-webkit-datetime-edit-day-field': {
              color: '#1f2937',
            },
            '&::-webkit-datetime-edit-year-field': {
              color: '#1f2937',
            },
          },
          // Special styling for file inputs
          '& input[type="file"]': {
            padding: '8px 0',
            '&::-webkit-file-upload-button': {
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              padding: '8px 16px',
              marginRight: '12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#e5e7eb',
              },
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
