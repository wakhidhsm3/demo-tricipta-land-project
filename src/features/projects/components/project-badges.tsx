import React from 'react';
import { cn } from '@/lib/utils';
import {
  ProjectCategory,
  ProjectStatus,
  PROJECT_CATEGORY_LABEL_MAP,
  PROJECT_STATUS_LABEL_MAP,
} from '../types/project.type';

export interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const label = PROJECT_STATUS_LABEL_MAP[status] || status;

  if (status === 'DIJUAL') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-bold tracking-tight bg-slate-950/75 backdrop-blur-md text-white border border-white/15 shadow-2xs whitespace-nowrap shrink-0',
          className
        )}
      >
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span>{label}</span>
      </span>
    );
  }

  if (status === 'SEGERA_HADIR') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-bold tracking-tight bg-amber-500 text-slate-950 border border-amber-400/80 shadow-2xs whitespace-nowrap shrink-0',
          className
        )}
      >
        <span className="size-1.5 rounded-full bg-slate-950 shrink-0" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-medium tracking-tight bg-slate-800/80 backdrop-blur-md text-slate-300 border border-white/10 shadow-2xs whitespace-nowrap shrink-0',
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-slate-400 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export interface ProjectCategoryBadgeProps {
  category: ProjectCategory;
  className?: string;
}

export function ProjectCategoryBadge({ category, className }: ProjectCategoryBadgeProps) {
  const label = PROJECT_CATEGORY_LABEL_MAP[category] || category;

  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold tracking-tight bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/90 shadow-2xs whitespace-nowrap shrink-0',
        className
      )}
    >
      {label}
    </span>
  );
}
