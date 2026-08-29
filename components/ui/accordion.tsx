'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border bg-white', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between p-5 text-left font-serif text-lg font-semibold text-foreground hover:bg-brand-sage/10 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn('h-5 w-5 text-brand-forest transition-transform duration-200', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
