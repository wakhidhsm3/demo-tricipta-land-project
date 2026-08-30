'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEscapeKey } from '@/hooks';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: readonly ComboboxOption[] | ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Pilih opsi...',
  searchPlaceholder = 'Cari...',
  emptyMessage = 'Tidak ada hasil ditemukan.',
  className,
  disabled = false,
  icon,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxId = React.useId();

  // Close on escape key
  useEscapeKey(() => setIsOpen(false), isOpen);

  // Close on click outside
  React.useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, searchQuery]);

  const handleToggle = () => {
    if (!isOpen) {
      setSearchQuery('');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (val: string) => {
    onValueChange(val);
    setIsOpen(false);
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange('ALL');
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Combobox Trigger Button */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white px-3.5 py-2 text-sm text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-700/15 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer select-none text-left',
          isOpen && 'bg-white border-emerald-600 ring-3 ring-emerald-700/15'
        )}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          <span className={cn('truncate', !selectedOption && 'text-slate-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-slate-400">
          {value && value !== 'ALL' && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClearSelection}
              onKeyDown={(e) => e.key === 'Enter' && handleClearSelection(e as unknown as React.MouseEvent)}
              className="p-0.5 hover:text-slate-700 rounded-md transition-colors"
              aria-label="Hapus pilihan"
            >
              <X className="size-3.5" />
            </span>
          )}
          <ChevronsUpDown className="size-4 shrink-0" />
        </div>
      </button>

      {/* Combobox Dropdown Popover */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-80 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-slate-800 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 flex flex-col"
        >
          {/* Search Input Field */}
          <div className="relative mb-1 px-1 pt-0.5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-9 pl-8 pr-8 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Bersihkan pencarian"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-60 flex flex-col gap-0.5 py-1 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-2 pl-3 pr-3 text-xs sm:text-sm font-medium transition-colors text-left',
                      isSelected
                        ? 'bg-emerald-50 text-emerald-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="size-4 text-emerald-700 font-bold shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
