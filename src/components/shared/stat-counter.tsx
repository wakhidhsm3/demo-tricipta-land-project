'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ANIMATION_DURATIONS } from '@/lib/config/ui.constants';

export interface StatCounterProps {
  value: string;
  className?: string;
  durationMs?: number;
}

/** Parse string value to numeric target and formatted suffix */
export function parseStatValue(raw: string): {
  target: number;
  prefix: string;
  suffix: string;
  isDecimal: boolean;
} {
  const match = raw.match(/([\d.,]+)/);
  if (!match) return { target: 0, prefix: '', suffix: raw, isDecimal: false };

  const numStr = match[1];
  const cleaned = numStr.replace(/\./g, '');
  const target = parseFloat(cleaned) || 0;
  const prefix = raw.substring(0, match.index ?? 0);
  const suffix = raw.substring((match.index ?? 0) + numStr.length);

  return { target, prefix, suffix, isDecimal: numStr.includes(',') };
}

export function StatCounter({
  value,
  className = '',
  durationMs = ANIMATION_DURATIONS.STAT_COUNTER_DEFAULT_MS,
}: StatCounterProps) {
  const { target, prefix, suffix } = parseStatValue(value);

  const [currentVal, setCurrentVal] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return target;
    }
    return 0;
  });
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    let animFrameId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();

          const step = (now: number) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            // Smooth ease-out exponential curve
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = Math.floor(ease * target);
            setCurrentVal(val);

            if (progress < 1) {
              animFrameId = requestAnimationFrame(step);
            } else {
              setCurrentVal(target);
            }
          };

          animFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [target, durationMs]);

  const formattedNumber =
    currentVal >= 1000 ? currentVal.toLocaleString('id-ID') : currentVal.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
