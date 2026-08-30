'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ICON_NAMES } from '@/lib/config/navigation.config';
import { isActiveNavLink } from '@/lib/utils';
import { NavIcon } from './nav-icon';

export interface NavLinkActiveProps {
  href: string;
  label: string;
}

export function NavLinkActive({ href, label }: NavLinkActiveProps) {
  const pathname = usePathname();
  const isActive = isActiveNavLink(pathname, href);
  const iconName = NAV_ICON_NAMES[href] || 'Home';

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs lg:text-sm transition-colors duration-150 whitespace-nowrap border ${
        isActive
          ? 'bg-emerald-50 text-emerald-900 font-semibold border-emerald-200/70 shadow-2xs'
          : 'border-transparent text-slate-700 hover:bg-slate-100/90 hover:text-slate-900 font-medium'
      }`}
    >
      <span
        className={
          isActive
            ? 'text-emerald-800'
            : 'text-slate-400 group-hover:text-emerald-700 transition-colors'
        }
      >
        <NavIcon name={iconName} className="size-4 shrink-0" />
      </span>
      <span>{label}</span>
    </Link>
  );
}
