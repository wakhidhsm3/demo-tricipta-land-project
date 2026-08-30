import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'muted' | 'outline' | 'success' | 'glass';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-hidden';

  const variants = {
    default: 'border-emerald-800/20 bg-emerald-800 text-white shadow-2xs',
    gold: 'border-amber-400/50 bg-amber-500 text-slate-950 font-bold shadow-2xs',
    muted: 'border-slate-200 bg-slate-100 text-slate-600',
    outline: 'border-slate-200/80 text-slate-800 bg-white/90 backdrop-blur-xs shadow-2xs',
    success: 'border-emerald-700/20 bg-emerald-700 text-white shadow-2xs',
    glass: 'border-white/20 bg-slate-950/75 backdrop-blur-md text-white shadow-2xs',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}
