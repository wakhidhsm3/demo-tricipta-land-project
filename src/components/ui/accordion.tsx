'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.use(AccordionContext);
  if (!context) {
    throw new Error('Accordion subcomponents must be used within an Accordion');
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItem() {
  const context = React.use(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem subcomponents must be used within an AccordionItem');
  }
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
}

export function Accordion({
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const isControlled = controlledValue !== undefined;
  const currentValues = React.useMemo(() => {
    if (isControlled) {
      return Array.isArray(controlledValue) ? controlledValue : [controlledValue];
    }
    return internalValue;
  }, [controlledValue, internalValue, isControlled]);


  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let nextValues: string[];
      if (type === 'single') {
        nextValues = currentValues.includes(itemValue) ? [] : [itemValue];
      } else {
        nextValues = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue];
      }

      if (!isControlled) {
        setInternalValue(nextValues);
      }

      if (onValueChange) {
        onValueChange(type === 'single' ? nextValues[0] || '' : nextValues);
      }
    },
    [currentValues, isControlled, onValueChange, type]
  );

  return (
    <AccordionContext value={{ openItems: currentValues, toggleItem }}>
      <div
        className={cn('divide-y divide-slate-200 overflow-hidden', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext value={{ value, isOpen }}>
      <div className={cn('overflow-hidden transition-colors duration-200', className)} {...props}>
        {children}
      </div>
    </AccordionItemContext>
  );
}

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const { toggleItem } = useAccordion();
  const { value, isOpen } = useAccordionItem();

  return (
    <h3>
      <button
        type="button"
        onClick={() => toggleItem(value)}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-4 py-5 px-6 sm:px-7 text-left text-base sm:text-lg font-serif font-bold text-slate-900 hover:text-emerald-800 hover:bg-slate-50/50 transition-all cursor-pointer select-none',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          className={cn(
            'size-5 text-slate-400 shrink-0 transition-transform duration-300 ease-out',
            isOpen && 'rotate-180 text-emerald-700'
          )}
        />
      </button>
    </h3>
  );
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { isOpen } = useAccordionItem();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed animate-in fade-in duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
