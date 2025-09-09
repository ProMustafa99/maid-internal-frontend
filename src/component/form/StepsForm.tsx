import React, { useState, useEffect } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Chip,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  ContactPhone as ContactIcon,
  Home as HomeIcon,
  Description as DocumentIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

interface StepsFormProps {
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
    section?: string;
  }>;
  onFormChange?: (formData: Record<string, any>) => void;
  onValidate?: (isValid: boolean, errors: Record<string, string>) => void;
  onSubmit?: (formData: Record<string, any>) => void;
  buttonTitle: string;
  isLoading?: boolean;
}

// Define step sections with icons and titles
const STEP_SECTIONS = [
  { key: 'personal', title: 'Personal Information', icon: <PersonIcon />, color: '#3B82F6' },
  { key: 'contact', title: 'Contact Details', icon: <ContactIcon />, color: '#10B981' },
  { key: 'work', title: 'Work Experience', icon: <WorkIcon />, color: '#F59E0B' },
  { key: 'address', title: 'Address Information', icon: <HomeIcon />, color: '#8B5CF6' },
  { key: 'documents', title: 'Documents & References', icon: <DocumentIcon />, color: '#EF4444' },
  { key: 'security', title: 'Security & Verification', icon: <SecurityIcon />, color: '#6B7280' }
];

export default function StepsForm({ 
  formFields, 
  onFormChange, 
  onValidate, 
  onSubmit, 
  buttonTitle, 
  isLoading = false 
}: StepsFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initialData: Record<string, any> = {};
    formFields.forEach(field => {
      initialData[field.name] = field.value || '';
    });
    return initialData;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasValidated, setHasValidated] = useState(false);

  // Group fields by section
  const fieldsBySection = formFields.reduce((acc, field) => {
    const section = field.section || 'personal';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {} as Record<string, typeof formFields>);

  // Get available steps based on form fields
  const availableSteps = STEP_SECTIONS.filter(step => fieldsBySection[step.key]?.length > 0);

  const handleInputChange = (name: string, value: string | number) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    onFormChange?.(newFormData);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const currentStepKey = availableSteps[activeStep]?.key;
    if (!currentStepKey) return true;

    const currentStepFields = fieldsBySection[currentStepKey] || [];
    const newErrors: Record<string, string> = {};
    
    currentStepFields.forEach(field => {
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
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCompletedSteps(prev => new Set([...prev, activeStep]));
      setActiveStep(prev => Math.min(prev + 1, availableSteps.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (step: number) => {
    if (step <= activeStep || completedSteps.has(step - 1)) {
      setActiveStep(step);
    }
  };

  const handleSubmit = () => {
    setHasValidated(true);
    const allErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      const value = formData[field.name];
      
      if (field.validation.required && (!value || value.toString().trim() === '')) {
        allErrors[field.name] = `${field.label} is required`;
      }
      
      if (value && field.validation.minLength > 0 && value.toString().length < field.validation.minLength) {
        allErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters`;
      }
      
      if (value && field.validation.maxLength > 0 && value.toString().length > field.validation.maxLength) {
        allErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
      }
    });
    
    setErrors(allErrors);
    const isValid = Object.keys(allErrors).length === 0;
    onValidate?.(isValid, allErrors);
    
    if (isValid && onSubmit) {
      onSubmit(formData);
    }
  };

  const renderField = (field: typeof formFields[0]) => {
    const commonProps = {
      label: field.label,
      name: field.name,
      value: formData[field.name] || '',
      placeholder: field.placeholder,
      required: field.validation.required,
      error: hasValidated ? errors[field.name] || '' : field.error,
      onChange: (e: any) => handleInputChange(field.name, e.target.value),
      className: "transition-all duration-200 hover:shadow-md focus-within:shadow-lg"
    };

    if (field.type === 'select') {
      return (
        <Select
          {...commonProps}
          options={field.options || []}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <Input
          {...commonProps}
          type={field.type}
          className={`${commonProps.className} min-h-[120px]`}
        />
      );
    }

    if (field.type === 'file') {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
          <Input
            {...commonProps}
            type={field.type}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      );
    }

    return (
      <Input
        {...commonProps}
        type={field.type}
      />
    );
  };

  const getStepProgress = () => {
    return ((activeStep + 1) / availableSteps.length) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Header */}
      <Paper elevation={2} className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h4" component="h1" className="font-bold text-gray-900">
            {buttonTitle}
          </Typography>
          <Chip 
            label={`Step ${activeStep + 1} of ${availableSteps.length}`}
            color="primary"
            variant="outlined"
          />
        </div>
        <LinearProgress 
          variant="determinate" 
          value={getStepProgress()} 
          className="h-2 rounded-full"
        />
        <Typography variant="body2" className="text-gray-600 mt-2">
          {Math.round(getStepProgress())}% Complete
        </Typography>
      </Paper>

      {/* Stepper */}
      <Stepper activeStep={activeStep} orientation="horizontal" className="mb-8">
        {availableSteps.map((step, index) => (
          <Step key={step.key} completed={completedSteps.has(index)}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              className="cursor-pointer"
              StepIconComponent={({ active, completed }) => (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: completed 
                      ? '#10B981' 
                      : active 
                        ? step.color 
                        : '#E5E7EB',
                    color: completed || active ? 'white' : '#6B7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    }
                  }}
                >
                  {completed ? <CheckCircleIcon /> : step.icon}
                </Box>
              )}
            >
              <Typography variant="body2" className="font-medium">
                {step.title}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Paper elevation={1} className="p-8">
        <Box className="mb-6">
          <div className="flex items-center mb-4">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: availableSteps[activeStep]?.color + '20',
                color: availableSteps[activeStep]?.color,
                marginRight: 2
              }}
            >
              {availableSteps[activeStep]?.icon}
            </Box>
            <div>
              <Typography variant="h5" className="font-bold text-gray-900">
                {availableSteps[activeStep]?.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Please provide the following information
              </Typography>
            </div>
          </div>
          <Divider />
        </Box>

        <StepContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableSteps[activeStep] && 
             fieldsBySection[availableSteps[activeStep].key]?.map((field) => (
              <div key={field.name} className={field.type === 'textarea' || field.type === 'file' ? 'lg:col-span-2' : ''}>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Box className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              title="Back"
              onClick={handleBack}
              color="secondary"
              variant="outline"
              size="lg"
              disabled={activeStep === 0}
              className="min-w-[120px]"
            />
            
            <div className="flex gap-4">
              {activeStep === availableSteps.length - 1 ? (
                <Button
                  title={isLoading ? "Submitting..." : buttonTitle}
                  onClick={handleSubmit}
                  color="primary"
                  variant="solid"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 min-w-[200px]"
                  disabled={isLoading}
                />
              ) : (
                <Button
                  title="Next"
                  onClick={handleNext}
                  color="primary"
                  variant="solid"
                  size="lg"
                  className="min-w-[120px]"
                />
              )}
            </div>
          </Box>
        </StepContent>
      </Paper>

      {/* Summary Alert */}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" className="mt-4">
          <Typography variant="body2">
            Please fix the errors above before proceeding.
          </Typography>
        </Alert>
      )}
    </div>
  );
}
