import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer rounded-xl select-none';

  const variants = {
    default: 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-2xs hover:shadow-xs',
    secondary: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200/60',
    outline: 'border border-slate-200 text-slate-800 hover:bg-slate-50 hover:text-emerald-800',
    accent: 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-2xs',
    ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-900',
    link: 'text-emerald-800 underline-offset-4 hover:underline p-0 h-auto',
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-11 px-5 text-sm gap-2',
    lg: 'h-12 px-6 text-sm sm:text-base gap-2.5 rounded-xl',
    icon: 'h-10 w-10 p-0 rounded-full',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
