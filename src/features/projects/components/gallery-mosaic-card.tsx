import React from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { ProjectGalleryImage } from '../types/project.type';
import { cn } from '@/lib/utils';

export interface GalleryMosaicCardProps {
  image: ProjectGalleryImage;
  onClick: () => void;
  sizes: string;
  priority?: boolean;
  className?: string;
  isMainHero?: boolean;
  extraCount?: number;
}

export function GalleryMosaicCard({
  image,
  onClick,
  sizes,
  priority = false,
  className,
  isMainHero = false,
  extraCount,
}: GalleryMosaicCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const label = isMainHero
    ? `Lihat foto utama: ${image.caption || image.alt}`
    : extraCount && extraCount > 0
    ? `Buka galeri lengkap (+${extraCount} foto lainnya)`
    : `Lihat foto: ${image.caption || image.alt}`;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={label}
      className={cn(
        'relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group bg-slate-100 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 transition-all duration-300',
        className
      )}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes={sizes}
      />

      {isMainHero ? (
        <>
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
          <div className="absolute top-4 left-4 size-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200 shadow-xs">
            <Eye className="size-4.5" />
          </div>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-xs sm:text-sm font-semibold drop-shadow-xs line-clamp-1">
              {image.caption || image.alt}
            </span>
          </div>
        </>
      ) : extraCount && extraCount > 0 ? (
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1.5px] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-slate-950/50 p-2 text-center">
          <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white drop-shadow-md">
            +{extraCount} Foto
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      )}
    </div>
  );
}
