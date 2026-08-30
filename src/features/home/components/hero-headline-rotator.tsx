'use client';

import React, { useEffect, useState } from 'react';
import { HeroHeadline } from '../data/hero.data';
import { ANIMATION_DURATIONS } from '@/lib/config/ui.constants';
import { CurvedUnderline } from '@/components/shared';

export interface HeroHeadlineRotatorProps {
  headlines: readonly HeroHeadline[];
  rotationIntervalMs?: number;
}

export function HeroHeadlineRotator({
  headlines,
  rotationIntervalMs = ANIMATION_DURATIONS.HERO_HEADLINE_ROTATOR_MS,
}: HeroHeadlineRotatorProps) {
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    if (headlines.length <= 1) return;
    const interval = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % headlines.length);
    }, rotationIntervalMs);
    return () => clearInterval(interval);
  }, [headlines.length, rotationIntervalMs]);

  const currentHeadline = headlines[headlineIdx] || headlines[0];

  return (
    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] drop-shadow-xs">
      {currentHeadline.prefix}{' '}
      <span className="relative inline-block text-emerald-800 transition-all duration-500">
        {currentHeadline.highlight}
        <CurvedUnderline strokeVariant="gradient" />
      </span>
    </h1>
  );
}
