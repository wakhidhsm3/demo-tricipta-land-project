import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export function FormField({
  label,
  error,
  required = false,
  htmlFor,
  children,
  className,
  labelClassName,
}: FormFieldProps) {
  return (
    <div className={cn('w-full', className)}>
      <label
        htmlFor={htmlFor}
        className={cn('block text-xs font-bold text-slate-700 mb-1.5', labelClassName)}
      >
        {label}
        {required && ' *'}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
