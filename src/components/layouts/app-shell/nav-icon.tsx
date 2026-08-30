import React from 'react';
import { Home, Building2, Compass, BookOpen, PhoneCall, LucideProps } from 'lucide-react';
import { NavIconName } from '@/lib/config/navigation.config';

export interface NavIconProps extends Omit<LucideProps, 'ref'> {
  name: NavIconName;
}

export function NavIcon({ name, className, ...props }: NavIconProps) {
  switch (name) {
    case 'Building2':
      return <Building2 className={className} {...props} />;
    case 'Compass':
      return <Compass className={className} {...props} />;
    case 'BookOpen':
      return <BookOpen className={className} {...props} />;
    case 'PhoneCall':
      return <PhoneCall className={className} {...props} />;
    case 'Home':
    default:
      return <Home className={className} {...props} />;
  }
}
