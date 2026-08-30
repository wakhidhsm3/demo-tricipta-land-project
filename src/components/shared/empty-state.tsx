import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  resetText?: string;
  onReset?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title = 'Tidak Ada Hasil Ditemukan',
  description = 'Coba sesuaikan kata kunci pencarian atau ubah filter untuk menemukan apa yang Anda cari.',
  resetText = 'Reset Semua Filter',
  onReset,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'col-span-full flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 animate-in fade-in duration-300',
        className
      )}
    >
      {icon ? (
        <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
          {icon}
        </div>
      ) : (
        <div className="size-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-4 shadow-2xs">
          <RotateCcw className="size-6" />
        </div>
      )}

      <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">{description}</p>

      {onReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2 rounded-xl text-slate-700 border-slate-300 hover:bg-slate-100"
        >
          <RotateCcw className="size-3.5" />
          <span>{resetText}</span>
        </Button>
      )}
    </div>
  );
}
