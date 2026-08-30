'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'segmented' | 'pill';
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.use(TabsContext);
  if (!context) {
    throw new Error('Tabs subcomponents must be used within a <Tabs> component');
  }
  return context;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'segmented' | 'pill';
  children: React.ReactNode;
}

export function Tabs({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  variant = 'segmented',
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext value={{ value: currentValue, onValueChange: handleValueChange, variant }}>
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  const { variant } = useTabs();

  if (variant === 'pill') {
    return (
      <div
        className={cn(
          'flex flex-wrap items-center gap-1.5 py-1 px-1 w-full',
          className
        )}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs select-none',
        className
      )}
      role="tablist"
      {...props}
    >
      <div className="flex flex-col sm:grid sm:grid-flow-col sm:auto-cols-fr w-full gap-1 sm:gap-1.5">
        {children}
      </div>
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function TabsTrigger({
  value: triggerValue,
  icon,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { value, onValueChange, variant } = useTabs();
  const isActive = value === triggerValue;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onValueChange(triggerValue);
    onClick?.(e);
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer rounded-full select-none shrink-0 border border-transparent touch-manipulation [-webkit-tap-highlight-color:transparent] outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/50',
          isActive
            ? 'bg-emerald-700 text-white shadow-md'
            : 'text-slate-600 hover:text-emerald-800 bg-slate-100/90 hover:bg-slate-200/80 border-slate-200/60',
          className
        )}
        {...props}
      >
        {icon && (
          <span className={cn('transition-colors shrink-0', isActive ? 'text-emerald-200' : 'text-slate-400')}>
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={handleClick}
      className={cn(
        'flex items-center justify-center gap-2 py-3 sm:py-2.5 lg:py-3 px-4 sm:px-4 lg:px-6 text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-150 cursor-pointer rounded-xl text-center w-full select-none border touch-manipulation [-webkit-tap-highlight-color:transparent] outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/50',
        isActive
          ? 'bg-white text-slate-900 border-slate-200/90 shadow-xs ring-1 ring-black/5'
          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border-transparent',
        className
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            'shrink-0 transition-colors duration-150',
            isActive ? 'text-emerald-700' : 'text-slate-400'
          )}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ value: contentValue, className, children, ...props }: TabsContentProps) {
  const { value } = useTabs();

  if (value !== contentValue) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn('transition-opacity duration-200 focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </div>
  );
}


