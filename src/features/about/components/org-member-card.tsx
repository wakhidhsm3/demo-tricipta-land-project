import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OrgMemberCardProps {
  id: string;
  name: string;
  photoUrl: string;
  position: string;
  departmentName?: string;
  roleDescription: string;
  imageHeightClassName?: string;
  sizes?: string;
  className?: string;
}

export function OrgMemberCard({
  id,
  name,
  photoUrl,
  position,
  departmentName,
  roleDescription,
  imageHeightClassName = 'h-64',
  sizes = '(max-width: 768px) 100vw, 33vw',
  className,
}: OrgMemberCardProps) {
  return (
    <Link
      href={`/about/team/${id}`}
      className={cn(
        'bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col group',
        className
      )}
    >
      <div className={cn('relative w-full bg-slate-100 overflow-hidden', imageHeightClassName)}>
        <Image
          src={photoUrl}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] font-bold text-emerald-800 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs border border-white/40 inline-block truncate max-w-full">
            {position}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1 justify-between">
        <div className="space-y-1">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
            {name}
          </h4>
          {departmentName && (
            <span className="text-[11px] font-semibold text-slate-700 block line-clamp-1">
              {departmentName}
            </span>
          )}
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {roleDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
          <span>Lihat Profil Lengkap</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
