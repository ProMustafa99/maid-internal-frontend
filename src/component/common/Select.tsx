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
          '&.MuiFormLabel-filled': {
            color: '#64748b',
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
        '& .MuiSelect-select': {
          padding: '16px 20px',
          fontSize: '1rem',
          fontWeight: '500',
          color: '#1e293b',
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
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid #e2e8f0',
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
