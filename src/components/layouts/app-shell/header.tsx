import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeaderMobileNav } from './header-mobile-nav';
import { NavLinkActive } from './nav-link-active';
import { SectionContainer } from '@/components/shared';
import { siteConfig } from '@/lib/config/site.config';

export function Header() {
  const navigation = siteConfig.navigation;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-dashed border-slate-200 transition-all">
      <SectionContainer className="flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1 shrink-0">
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} Developer Properti`}
            width={160}
            height={52}
            priority
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
          />
        </Link>

        {/* Right: Desktop Navigation + Mobile Menu */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navigation.map((item) => (
              <NavLinkActive key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          {/* Mobile Navigation Dropdown Trigger */}
          <HeaderMobileNav navigation={navigation} />
        </div>
      </SectionContainer>
    </header>
  );
}
