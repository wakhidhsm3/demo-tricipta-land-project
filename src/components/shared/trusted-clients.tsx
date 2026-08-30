'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/config/ui.constants';
import type { PartnerLogo } from '@/features/home/types/home.type';

export interface TrustedClientsProps {
  logos: PartnerLogo[];
  label?: string;
}

// Logo SVG Renderers with pixel-perfect monochrome styling matching shadcnstudio
function ClientLogoGraphic({ id, name }: { id: string; name: string }) {
  switch (id) {
    case 'bank-btn':
      return (
        <div className="flex items-center gap-1.5 font-sans text-base font-black text-slate-800 tracking-tight">
          <span className="text-xs bg-slate-800 text-white px-1.5 py-0.5 rounded font-bold">BANK</span>
          <span>BTN</span>
        </div>
      );
    case 'bank-mandiri':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-bold text-slate-800 tracking-tight">
          <span>mandiri</span>
          <span className="text-amber-600 text-xs font-black">❯</span>
        </div>
      );
    case 'bank-bri':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-800">
          <span className="border-2 border-slate-800 px-1 py-0.2 rounded text-xs font-bold">BRI</span>
          <span className="text-xs tracking-wider font-bold text-slate-600">BANK</span>
        </div>
      );
    case 'bank-bni':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-800 tracking-widest">
          <span>BNI</span>
          <span className="size-2 rounded-full bg-emerald-700 inline-block" />
        </div>
      );
    case 'bank-bsi':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-bold text-slate-800 tracking-tight">
          <span className="font-extrabold text-emerald-800">BSI</span>
          <span className="text-[10px] text-slate-500 font-medium">Syariah</span>
        </div>
      );
    case 'bank-bjb':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-800 tracking-tight">
          <span className="text-xs font-bold text-blue-700">bank</span>
          <span>bjb</span>
        </div>
      );
    case 'bank-jateng':
      return (
        <div className="flex items-center gap-1 font-sans text-xs font-black text-slate-800 tracking-wider">
          <span className="text-[10px] bg-slate-800 text-white px-1 py-0.5 rounded">BANK</span>
          <span>JATENG</span>
        </div>
      );
    case 'bpn-ri':
      return (
        <div className="flex items-center gap-1 font-sans text-xs font-bold text-slate-800 tracking-tight">
          <span className="text-emerald-800 font-black">ATR</span>
          <span className="text-slate-400">/</span>
          <span>BPN RI</span>
        </div>
      );
    default:
      return (
        <span className="font-sans text-sm font-bold tracking-tight text-slate-700">
          {name}
        </span>
      );
  }
}

type SlotState = 'idle' | 'flipping-out' | 'flipping-in';

export function TrustedClients({ logos, label = 'Dipercaya oleh : ' }: TrustedClientsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedLogos, setDisplayedLogos] = useState<PartnerLogo[]>(() => logos.slice(0, 4));
  const [slotStates, setSlotStates] = useState<SlotState[]>(['idle', 'idle', 'idle', 'idle']);

  const batchIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const slotCountRef = useRef(4);

  // Responsive slot count
  useEffect(() => {
    const handleResize = () => {
      const count =
        window.innerWidth < 640 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4;
      if (count !== slotCountRef.current) {
        slotCountRef.current = count;
        batchIndexRef.current = 0;
        isAnimatingRef.current = false;
        setSlotStates(Array.from({ length: 4 }, () => 'idle'));
        setDisplayedLogos(logos.slice(0, count));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [logos]);

  // Smooth declarative 3D perspective flip animation
  const triggerFlip = useCallback(async () => {
    if (isAnimatingRef.current || !containerRef.current) return;
    isAnimatingRef.current = true;

    const count = slotCountRef.current;
    const totalBatches = Math.ceil(logos.length / count);
    const nextBatch = (batchIndexRef.current + 1) % totalBatches;
    const nextLogos = logos.slice(nextBatch * count, (nextBatch + 1) * count);

    const paddedNextLogos = [...nextLogos];
    while (paddedNextLogos.length < count) {
      paddedNextLogos.push(logos[paddedNextLogos.length % logos.length]);
    }

    const animateSlot = async (slotIdx: number, delayIdx: number) => {
      if (delayIdx > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, ANIMATION_DURATIONS.PARTNER_LOGO_STAGGER_MS * delayIdx)
        );
      }

      // Flip Out
      setSlotStates((prev) => {
        const next = [...prev];
        next[slotIdx] = 'flipping-out';
        return next;
      });

      await new Promise((resolve) =>
        setTimeout(resolve, ANIMATION_DURATIONS.PARTNER_LOGO_FLIP_OUT_MS)
      );

      // Swap content and prepare flip in
      setDisplayedLogos((prev) => {
        const next = [...prev];
        next[slotIdx] = paddedNextLogos[slotIdx];
        return next;
      });

      setSlotStates((prev) => {
        const next = [...prev];
        next[slotIdx] = 'flipping-in';
        return next;
      });

      await new Promise((resolve) =>
        setTimeout(resolve, ANIMATION_DURATIONS.PARTNER_LOGO_FLIP_IN_MS)
      );

      setSlotStates((prev) => {
        const next = [...prev];
        next[slotIdx] = 'idle';
        return next;
      });
    };

    // Stagger animation across visible slots (right to left wave effect)
    await Promise.all(Array.from({ length: count }, (_, i) => animateSlot(count - 1 - i, i)));

    batchIndexRef.current = nextBatch;
    isAnimatingRef.current = false;
  }, [logos]);

  useEffect(() => {
    let isVisible = true;
    let timer: NodeJS.Timeout | null = null;

    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => {
          if (isVisible) {
            triggerFlip();
          }
        }, ANIMATION_DURATIONS.PARTNER_LOGO_FLIP_MS);
      }
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startTimer();
          } else {
            stopTimer();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        stopTimer();
      };
    }

    startTimer();
    return () => stopTimer();
  }, [triggerFlip]);

  return (
    <div className="z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-4 sm:mt-5 mb-2 sm:mb-3">
      <span className="text-slate-900 font-semibold text-xs sm:text-sm tracking-normal shrink-0">
        {label}
      </span>
      <div
        ref={containerRef}
        className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3 min-h-10"
      >
        {displayedLogos.map((logo, idx) => {
          const state = slotStates[idx] || 'idle';
          const isFlippingOut = state === 'flipping-out';
          const isFlippingIn = state === 'flipping-in';

          return (
            <div
              key={`slot-${idx}`}
              className="flex w-32 sm:w-36 h-9 sm:h-10 items-center justify-center px-2.5 py-1 transition-all select-none"
              style={{
                perspective: '600px',
                transformStyle: 'preserve-3d',
                transform: isFlippingOut ? 'rotateX(90deg)' : isFlippingIn ? 'rotateX(0deg)' : 'none',
                opacity: isFlippingOut ? 0 : 1,
                filter: isFlippingOut ? 'blur(6px)' : 'blur(0px)',
                transitionDuration: isFlippingOut
                  ? `${ANIMATION_DURATIONS.PARTNER_LOGO_FLIP_OUT_MS}ms`
                  : `${ANIMATION_DURATIONS.PARTNER_LOGO_FLIP_IN_MS}ms`,
              }}
            >
              <div className="opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full scale-90 sm:scale-95">
                <ClientLogoGraphic id={logo.id} name={logo.name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
