import React, { useEffect, useRef } from 'react';
import Button from './Button';
import Header from './Header';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  fullWidth?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the dialog
      if (dialogRef.current) {
        dialogRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore focus when dialog closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [open, onClose, closeOnEscape]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  const getMaxWidthClass = () => {
    if (fullWidth) return 'w-full';
    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
    };
    return maxWidthClasses[maxWidth];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={handleBackdropClick}
      />
      
      {/* Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Dialog Content */}
        <div
          ref={dialogRef}
          className={`relative bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out ${getMaxWidthClass()} ${className}`}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Header 
                level="h2" 
                size="lg" 
                weight="semibold" 
                color="default"
              > 
                {title}
              </Header>
              <Button
                title=""
                onClick={onClose}
                hasBackground={false}
                color="gray"
                size="sm"
                variant="ghost"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }
                className="p-1 rounded-full hover:bg-gray-100"
              />
            </div>
          )}

          {/* Body */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
