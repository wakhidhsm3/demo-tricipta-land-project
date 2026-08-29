'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Building2, Compass, BookOpen, PhoneCall } from 'lucide-react';
import { HeaderMobileNav } from './HeaderMobileNav';
import { companyProfileData } from '@/lib/data/companyProfile';

const navIcons: Record<string, React.ReactNode> = {
  '/': <Home className="size-4 shrink-0" />,
  '/about': <Building2 className="size-4 shrink-0" />,
  '/projects': <Compass className="size-4 shrink-0" />,
  '/articles': <BookOpen className="size-4 shrink-0" />,
  '/contact': <PhoneCall className="size-4 shrink-0" />,
};

export function Header() {
  const pathname = usePathname();
  const { navigation } = companyProfileData;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 min-[1280px]:border-x min-[1280px]:border-dashed min-[1280px]:border-slate-200">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1 shrink-0">
          <Image
            src="/logo.png"
            alt="TRICIPTA LAND Developer Properti"
            width={160}
            height={52}
            priority
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
          />
        </Link>

        {/* Right: Desktop Navigation + Mobile Menu */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
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
                    {navIcons[item.href] || <Home className="size-4 shrink-0" />}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation Dropdown Trigger */}
          <HeaderMobileNav navigation={navigation} />
        </div>
      </div>
    </header>
  );
}
