'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function Sheet({ isOpen, onClose, title, children, side = 'right', className }: SheetProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideStyles = {
    right: 'right-0 slide-in-from-right',
    left: 'left-0 slide-in-from-left',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          'fixed top-0 bottom-0 z-50 h-full w-4/5 max-w-sm bg-white p-6 shadow-2xl transition-transform animate-in duration-300 flex flex-col',
          sideStyles[side],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          {title ? (
            <span className="font-serif text-lg font-bold text-brand-forest">{title}</span>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            aria-label="Tutup Sheet Navigasi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
