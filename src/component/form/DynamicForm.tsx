import Button from "../common/Button";
import Input from "../common/Input";
import { useState } from "react";

interface DynamicFormProps {
  formFields: Array<{
    name: string;
    type: string;
    label: string;
    placeholder: string;
    validation: {
      required: boolean;
      minLength: number;
      maxLength: number;
    };
    value: string | number | undefined;
    error: string;
  }>;
  onFormChange?: (formData: Record<string, any>) => void;
  onValidate?: (isValid: boolean, errors: Record<string, string>) => void;
}

export default function DynamicForm({ formFields, onFormChange, onValidate }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    formFields.forEach(field => {
      initialData[field.name] = field.value || '';
    });
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasValidated, setHasValidated] = useState(false);

  const handleInputChange = (name: string, value: string | number) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    onFormChange?.(newFormData);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    setHasValidated(true);
    const newErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      const value = formData[field.name];
      
      // Required validation
      if (field.validation.required && (!value || value.toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      // Min length validation
      if (value && field.validation.minLength > 0 && value.toString().length < field.validation.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters`;
      }
      
      // Max length validation
      if (value && field.validation.maxLength > 0 && value.toString().length > field.validation.maxLength) {
        newErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
      }
    });
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidate?.(isValid, newErrors);
    
    return isValid;
  };

  return (
    <div className="">
      {formFields.map((field) => (
        <div key={field.name} className="mb-4">
          <Input
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.validation.required}
            className="mb-4"
            value={formData[field.name] || ''}
            error={hasValidated ? errors[field.name] || '' : field.error}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        </div>
      ))}
      
      {/* Validation Button */}
      <div className="mt-6">
        <Button
          title="Validate Form"
          onClick={validateForm}
          color="primary"
          variant="solid"
          size="md"
          className="w-full"
        />
      </div>
    </div>
  );
}
