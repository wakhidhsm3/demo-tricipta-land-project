'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PartnerLogo } from '@/lib/types/partners';

interface TrustedClientsProps {
  logos: PartnerLogo[];
  label?: string;
}

// Logo SVG Renderers with pixel-perfect monochrome styling matching shadcnstudio
function ClientLogoGraphic({ id, name }: { id: string; name: string }) {
  switch (id) {
    case 'attentive':
      return (
        <div className="flex items-center gap-1">
          <span className="font-sans text-xl font-bold tracking-tight text-slate-700">
            attentive
          </span>
          <span className="text-[9px] font-semibold text-slate-400 -mt-2">®</span>
        </div>
      );
    case 'chrono':
      return (
        <div className="flex items-center gap-1.5 text-left">
          <div className="flex flex-col leading-tight">
            <span className="font-sans text-base font-extrabold tracking-tight text-slate-700">
              chrono
            </span>
            <span className="text-[9px] font-medium tracking-wider text-slate-500 uppercase -mt-0.5">
              innovation
            </span>
          </div>
          <svg className="h-6 w-5 fill-slate-700 shrink-0" viewBox="0 0 24 28">
            <path d="M4 2h16l-7 11 7 13H4l7-13L4 2z" />
          </svg>
        </div>
      );
    case 'onextech':
      return (
        <div className="flex items-center text-slate-700 font-sans text-lg font-bold tracking-tight">
          <span>One</span>
          <span className="text-slate-400 font-light mx-0.5">✕</span>
          <span className="font-extrabold">Tech</span>
        </div>
      );
    case 'verilife':
      return (
        <div className="flex items-center gap-1">
          <svg className="h-5 w-4 fill-slate-600 shrink-0 -mr-0.5" viewBox="0 0 20 20">
            <path d="M10 2C6 5 4 9 4 14c3-2 6-2 12-4-2-4-4-7-6-8z" opacity="0.8" />
            <path d="M10 2c1 3 2 6 3 9-3 1-5 1-7 2 1-4 2-7 4-11z" />
          </svg>
          <span className="font-sans text-xl font-bold tracking-normal text-slate-700">
            verilife
          </span>
        </div>
      );
    case 'codeagency':
      return (
        <div className="flex items-center gap-1.5 font-sans font-black tracking-wider text-sm text-slate-700 uppercase">
          <svg className="h-5 w-5 stroke-slate-700 stroke-2 fill-none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 10l-2 2 2 2M15 10l2 2-2 2M13 8l-2 8" />
          </svg>
          <span>CODEAGENCY</span>
        </div>
      );
    case 'bitwip':
      return (
        <div className="flex items-center gap-1 font-mono text-base font-black tracking-widest text-slate-700 uppercase">
          <span className="bg-slate-700 text-white text-[10px] px-1 py-0.5 rounded-xs">BIT</span>
          <span>WIP.</span>
        </div>
      );
    case 'grooved':
      return (
        <div className="flex flex-col text-center leading-none">
          <span className="font-serif italic font-bold text-lg text-slate-700 tracking-tight">
            grooved
          </span>
          <span className="text-[8px] uppercase tracking-widest font-sans font-semibold text-slate-500">
            learning
          </span>
        </div>
      );
    case 'scaleapp':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-bold text-slate-700">
          <svg className="h-4 w-4 fill-slate-700" viewBox="0 0 24 24">
            <path d="M4 19h16v2H4zM6 14h12v2H6zM8 9h8v2H8zM10 4h4v2h-4z" />
          </svg>
          <span>scale<span className="font-light text-slate-500">app</span></span>
        </div>
      );
    case 'bank-btn':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-700 tracking-tight">
          <span className="text-xs bg-slate-700 text-white px-1.5 py-0.5 rounded font-bold">BANK</span>
          <span>BTN</span>
        </div>
      );
    case 'bank-mandiri':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-bold text-slate-700 tracking-tight">
          <span>mandiri</span>
          <span className="text-amber-600 text-xs font-black">❯</span>
        </div>
      );
    case 'bank-bri':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-700">
          <span className="border-2 border-slate-700 px-1 py-0.2 rounded text-xs">BRI</span>
          <span className="text-xs tracking-wider">BANK</span>
        </div>
      );
    case 'bank-bni':
      return (
        <div className="flex items-center gap-1 font-sans text-base font-black text-slate-700 tracking-widest">
          <span>BNI</span>
          <span className="h-2 w-2 rounded-full bg-emerald-700 inline-block" />
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

export function TrustedClients({ logos, label = 'Dipercaya oleh : ' }: TrustedClientsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedLogos, setDisplayedLogos] = useState<PartnerLogo[]>(() => logos.slice(0, 4));
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
        if (containerRef.current) {
          for (let i = 0; i < 4; i++) {
            const slot = containerRef.current.querySelector<HTMLElement>(`.logo-slot-${i}`);
            if (slot) {
              slot.style.transform = '';
              slot.style.opacity = '1';
              slot.style.filter = '';
            }
          }
        }
        setDisplayedLogos(logos.slice(0, count));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [logos]);

  // Exact 3D Perspective Flip animation matching shadcnstudio
  const triggerFlip = useCallback(async () => {
    if (isAnimatingRef.current || !containerRef.current) return;
    isAnimatingRef.current = true;

    const count = slotCountRef.current;
    const totalBatches = Math.ceil(logos.length / count);
    const nextBatch = (batchIndexRef.current + 1) % totalBatches;
    const nextLogos = logos.slice(nextBatch * count, (nextBatch + 1) * count);

    // If next batch has fewer items than count, wrap around to fill
    const paddedNextLogos = [...nextLogos];
    while (paddedNextLogos.length < count) {
      paddedNextLogos.push(logos[paddedNextLogos.length % logos.length]);
    }

    const animateSlot = async (slotIdx: number, delayIdx: number) => {
      if (delayIdx > 0) {
        await new Promise((resolve) => setTimeout(resolve, 70 * delayIdx));
      }

      const slot = containerRef.current?.querySelector<HTMLElement>(`.logo-slot-${slotIdx}`);
      if (!slot) return;

      // Flip Out (rotateX 90deg + blur + fade out)
      slot.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in, filter 0.3s ease-in';
      slot.style.transform = 'rotateX(90deg)';
      slot.style.filter = 'blur(6px)';
      slot.style.opacity = '0';

      await new Promise((resolve) => setTimeout(resolve, 300));

      // Swap content while hidden
      setDisplayedLogos((prev) => {
        const next = [...prev];
        next[slotIdx] = paddedNextLogos[slotIdx];
        return next;
      });

      // Prepare flip in from negative angle without transition
      slot.style.transition = 'none';
      slot.style.transform = 'rotateX(-90deg)';

      // Wait for next browser paint
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      // Flip In (rotateX 0deg + unblur + fade in)
      slot.style.transition =
        'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-out, filter 0.35s ease-out';
      slot.style.transform = 'rotateX(0deg)';
      slot.style.filter = 'blur(0px)';
      slot.style.opacity = '1';
    };

    // Stagger animation across visible slots (right to left wave effect like in shadcnstudio)
    await Promise.all(Array.from({ length: count }, (_, i) => animateSlot(count - 1 - i, i)));

    batchIndexRef.current = nextBatch;
    isAnimatingRef.current = false;
  }, [logos]);

  useEffect(() => {
    const timer = setInterval(triggerFlip, 3200);
    return () => clearInterval(timer);
  }, [triggerFlip]);

  return (
    <div className="z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-4 sm:mt-5 mb-2 sm:mb-3">
      <span className="text-slate-900 font-semibold text-xs sm:text-sm tracking-normal shrink-0">
        {label}
      </span>
      <div
        ref={containerRef}
        className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-3 min-h-[40px]"
      >
        {displayedLogos.map((logo, idx) => (
          <div
            key={`slot-${idx}`}
            className={`logo-slot-${idx} flex w-32 sm:w-36 h-9 sm:h-10 items-center justify-center px-2.5 py-1 transition-colors duration-200 select-none`}
            style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
          >
            <div className="opacity-80 hover:opacity-100 transition-opacity flex items-center justify-center w-full h-full scale-90 sm:scale-95">
              <ClientLogoGraphic id={logo.id} name={logo.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
