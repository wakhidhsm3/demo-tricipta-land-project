import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({
  className,
  error,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          'flex min-h-30 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 shadow-2xs transition-colors hover:border-slate-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          error && 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
