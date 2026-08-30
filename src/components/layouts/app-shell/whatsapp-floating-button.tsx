'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config/site.config';
import { SCROLL_THRESHOLDS } from '@/lib/config/ui.constants';
import { openWhatsApp, buildGeneralInquiryMessage } from '@/lib/whatsapp';

export interface WhatsAppFloatingButtonProps {
  phone?: string;
}

export function WhatsAppFloatingButton({ phone = siteConfig.headOffice.whatsapp }: WhatsAppFloatingButtonProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);


  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > SCROLL_THRESHOLDS.FLOATING_WA_BUTTON);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleWaClick = () => {
    openWhatsApp({
      phone,
      message: buildGeneralInquiryMessage(),
    });
  };



  return (
    <aside aria-label="Floating Action Controls" className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 select-none">
      {/* Scroll To Top Button */}
      <Button
        type="button"
        variant="default"
        size="icon"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={cn(
          'size-11 sm:size-12 rounded-xl bg-slate-900 hover:bg-black text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-white/10',
          showScrollTop
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-2 pointer-events-none'
        )}
      >
        <ArrowUp className="size-5 text-white" />
      </Button>

      {/* WhatsApp / Chat Support Floating Button (Circle matching Gambar 2) */}
      <div className="relative group">
        {/* Tooltip on hover */}
        <div className="absolute right-0 bottom-full mb-2.5 hidden group-hover:flex items-center transition-all duration-200">
          <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-white/10">
            Konsultasi WhatsApp
          </div>
        </div>

        <button
          type="button"
          onClick={handleWaClick}
          aria-label="Konsultasi WhatsApp"
          className="relative size-12 sm:size-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-emerald-950/20 hover:shadow-emerald-950/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/50 group/btn"
        >
          {/* Online / Notification status indicator (Red) */}
          <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex size-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-3 bg-red-500 border-2 border-white shadow-xs"></span>
          </span>

          {/* Official WhatsApp App Logo SVG */}
          <svg
            className="size-6 text-white fill-current transition-transform duration-300 group-hover/btn:scale-110"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.786-1.676-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.509-.678-.519-.176-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.201 2.124 3.243 5.146 4.549.719.311 1.281.497 1.719.636.722.23 1.379.197 1.899.12.579-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.075-.126-.276-.201-.577-.351z" />
            <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.997.587 3.86 1.603 5.43L2 22l4.71-1.547a9.96 9.96 0 0 0 5.294 1.551c5.518 0 10.004-4.486 10.004-10.004C22.008 6.486 17.522 2 12.004 2zm0 18.174a8.13 8.13 0 0 1-4.33-1.242l-.31-.19-2.793.917.933-2.723-.207-.33a8.16 8.16 0 0 1-1.293-4.598c0-4.507 3.667-8.174 8.174-8.174 4.507 0 8.174 3.667 8.174 8.174 0 4.507-3.667 8.174-8.174 8.174z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
