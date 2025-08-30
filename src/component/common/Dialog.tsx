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
  fullScreen?: boolean;
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
  fullScreen = false,
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
    <div className={`fixed inset-0 z-50 overflow-y-auto ${fullScreen ? 'z-[9999]' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-in-out backdrop-blur-sm ${
          fullScreen ? 'bg-black/80' : 'bg-black/60'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Dialog Container */}
      <div className={`flex min-h-full ${fullScreen ? 'items-start' : 'items-center justify-center p-4'}`}>
        {/* Dialog Content */}
        <div
          ref={dialogRef}
          className={`relative bg-white shadow-2xl transform transition-all duration-300 ease-in-out ${
            fullScreen 
              ? 'w-full h-full rounded-none max-w-none' 
              : `rounded-2xl ${getMaxWidthClass()}`
          } ${className}`}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Dialog'}
        >
          {/* Header */}
          {title && (
            <div className={`flex items-center justify-between ${
              fullScreen ? 'p-8' : 'p-6'
            } bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl`}>
              <Header 
                level="h2" 
                size={fullScreen ? "2xl" : "lg"}
                weight="bold" 
                color="default"
                className="text-white"
              > 
                {title}
              </Header>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className={`${fullScreen ? 'p-8' : 'p-6'} bg-gray-50`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
