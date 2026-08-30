'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_ICON_NAMES } from '@/lib/config/navigation.config';
import { useEscapeKey, useBodyScrollLock } from '@/hooks';
import { isActiveNavLink } from '@/lib/utils';
import { NavIcon } from './nav-icon';

export interface HeaderMobileNavProps {
  navigation: readonly { label: string; href: string }[];
}

export function HeaderMobileNav({ navigation }: HeaderMobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Handle escape key and lock body scroll when mobile drawer is active
  useEscapeKey(() => setIsOpen(false), isOpen);
  useBodyScrollLock(isOpen);

  return (
    <div className="md:hidden">
      {/* Hamburger / Close Toggle Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-xl size-10 text-slate-800 hover:bg-slate-100/90 border-slate-200/90 shrink-0"
        aria-label={isOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="size-5 text-slate-900 transition-transform duration-150 rotate-90" />
        ) : (
          <Menu className="size-5 text-slate-900 transition-transform duration-150" />
        )}
      </Button>

      {/* Select Dropdown Popover */}
      {isOpen && (
        <>
          {/* Backdrop Mask */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-2xs animate-in fade-in duration-150"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Dropdown Card Popover with Exact Content Width Alignment */}
          <div className="fixed inset-x-0 top-16 z-50 px-4 sm:px-6 pt-2 animate-in fade-in zoom-in-95 duration-150">
            <div className="mx-auto max-w-7xl rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg flex flex-col gap-0.5 overflow-hidden">
              <nav className="flex flex-col gap-0.5">
                {navigation.map((item) => {
                  const isActive = isActiveNavLink(pathname, item.href);
                  const iconName = NAV_ICON_NAMES[item.href] || 'Home';

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg py-2.5 pl-3 pr-4 text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={
                            isActive
                              ? 'text-emerald-800'
                              : 'text-slate-400 group-hover:text-emerald-700 transition-colors'
                          }
                        >
                          <NavIcon name={iconName} className="size-4 shrink-0" />
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {isActive && (
                        <Check className="size-4 text-emerald-700 font-bold shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
