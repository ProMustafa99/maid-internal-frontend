import Button from "../common/Button";
import Header from "../common/Header";
import Input from "../common/Input";
import Paragraph from "../common/Paragraph";
import Select from "../common/Select";
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
    options?: Array<{ value: string; label: string }>;
  }>;
  onFormChange?: (formData: Record<string, any>) => void;
  onValidate?: (isValid: boolean, errors: Record<string, string>) => void;
  onSubmit?: (formData: Record<string, any>) => void;
  buttonTitle: string;
  isLoading?: boolean;
  title?: string;
  description?: string;
  hideSubmitButton?: boolean;
}

export default function DynamicForm({ formFields, onFormChange, onValidate, onSubmit, buttonTitle, isLoading = false, title, description, hideSubmitButton = false }: DynamicFormProps) {
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
    
    if (isValid && onSubmit) {
      onSubmit(formData);
    }
    
    return isValid;
  };

  // Group fields into pairs for two-column layout
  const fieldPairs = [];
  for (let i = 0; i < formFields.length; i += 2) {
    fieldPairs.push(formFields.slice(i, i + 2));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div className="flex-1">
            <Header level="h2" size="lg" weight="bold" color="default" className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</Header>
            <Paragraph size="sm" color="muted" className="text-sm sm:text-base text-gray-600">{description}</Paragraph>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            <Button
              title="Cancel"
              onClick={() => window.history.back()}
              color="secondary"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
            />
            {!hideSubmitButton && (
              <Button
                title={isLoading ? "Creating..." : buttonTitle}
                onClick={validateForm}
                color="primary"
                variant="solid"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 min-w-[200px]"
                disabled={isLoading}
              />
            )}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">

      <form className="space-y-6">
        {fieldPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pair.map((field) => (
              <div key={field.name} className="space-y-2">
                {field.type === 'select' ? (
                  <Select
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    options={field.options || []}
                    placeholder={field.placeholder}
                    required={field.validation.required}
                    className="transition-all duration-200 hover:shadow-md focus-within:shadow-lg"
                    error={hasValidated ? errors[field.name] || '' : field.error}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                  />
                ) : field.type === 'textarea' ? (
                  <div className="lg:col-span-2">
                    <Input
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.validation.required}
                      className="transition-all duration-200 hover:shadow-md focus-within:shadow-lg min-h-[120px]"
                      value={formData[field.name] || ''}
                      error={hasValidated ? errors[field.name] || '' : field.error}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    />
                  </div>
                ) : field.type === 'file' ? (
                  <div className="lg:col-span-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                      <Input
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.validation.required}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        value={formData[field.name] || ''}
                        error={hasValidated ? errors[field.name] || '' : field.error}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.validation.required}
                    className="transition-all duration-200 hover:shadow-md focus-within:shadow-lg"
                    value={formData[field.name] || ''}
                    error={hasValidated ? errors[field.name] || '' : field.error}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    {...(field.type === 'number' && { min: "1", max: "100" })}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </form>
      </div>
    </div>
  );
}
