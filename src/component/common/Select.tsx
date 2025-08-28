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
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
