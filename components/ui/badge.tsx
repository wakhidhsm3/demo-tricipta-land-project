import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gold' | 'muted' | 'outline' | 'success';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  const variants = {
    default: 'border-transparent bg-brand-forest text-white',
    gold: 'border-transparent bg-brand-gold text-brand-forest-dark font-bold',
    muted: 'border-transparent bg-muted text-muted-foreground',
    outline: 'border-brand-forest/30 text-brand-forest bg-brand-forest/5',
    success: 'border-transparent bg-emerald-700 text-white',
  };

  return <div className={cn(baseStyles, variants[variant], className)} {...props} />;
}
