import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface SectionHeaderProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badgeText,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-w-3xl mb-12',
        centered && 'mx-auto text-center items-center',
        className
      )}
    >
      {badgeText && <Badge variant="outline">{badgeText}</Badge>}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
