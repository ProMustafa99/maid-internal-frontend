import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string | number | undefined;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  onChange: (e: any) => void;
}

export default function Select({
  label,
  name,
  value,
  options,
  placeholder,
  required = false,
  error,
  className = '',
  onChange,
}: SelectProps) {
  return (
    <FormControl 
      fullWidth 
      required={required} 
      error={!!error}
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
          '&.Mui-focused': {
            color: error ? '#ef4444' : '#3b82f6',
          },
          '&.MuiFormLabel-filled': {
            color: '#6b7280',
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: '4px',
          fontSize: '0.75rem',
          fontWeight: '500',
          '&.Mui-error': {
            color: '#ef4444',
          },
        },
        '& .MuiSelect-select': {
          padding: '16px 20px',
          fontSize: '1rem',
          fontWeight: '500',
          color: '#1f2937',
        },
      }}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value || ''}
        label={label}
        onChange={onChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #d1d5db',
            }
          }
        }}
              >
        {options.length === 0 ? (
          <MenuItem disabled sx={{ 
            color: '#94a3b8', 
            fontStyle: 'italic',
            padding: '12px 20px',
            textAlign: 'center'
          }}>
            There is no choice
          </MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem key={option.value} value={option.value} sx={{ padding: '12px 20px' }}>
              {option.label}
            </MenuItem>
          ))
        )}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
