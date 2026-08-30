'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useEscapeKey, useBodyScrollLock } from '@/hooks';

import { Button } from '@/components/ui/button';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  hideHeader?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, hideHeader = false, children, className }: DialogProps) {
  useEscapeKey(onClose, isOpen);
  useBodyScrollLock(isOpen);


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-hidden',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            {title ? (
              <h3 className="font-serif text-xl font-bold text-foreground">{title}</h3>
            ) : (
              <div />
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="size-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Tutup Dialog"
            >
              <X className="size-5" />
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
