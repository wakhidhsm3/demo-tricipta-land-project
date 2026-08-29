import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer rounded-xl';

    const variants = {
      default: 'bg-brand-forest text-white hover:bg-brand-forest-dark shadow-sm hover:shadow-md hover:-translate-y-0.5',
      secondary: 'bg-brand-sage/20 text-brand-forest hover:bg-brand-sage/40 border border-brand-sage/40 hover:-translate-y-0.5',
      outline: 'border border-brand-forest/80 text-brand-forest hover:bg-brand-forest hover:text-white hover:-translate-y-0.5',
      accent: 'bg-brand-gold text-brand-forest-dark font-bold hover:bg-brand-gold-hover shadow-sm hover:shadow-md hover:-translate-y-0.5',
      ghost: 'hover:bg-brand-sage/20 text-foreground',
      link: 'text-brand-forest underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs gap-1.5',
      md: 'h-11 px-5 text-sm gap-2',
      lg: 'h-13 px-7 text-base gap-2.5 rounded-xl',
      icon: 'h-10 w-10 p-0 rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
