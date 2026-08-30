import React from 'react';

export interface CurvedUnderlineProps {
  strokeVariant?: 'green' | 'gradient';
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Reusable architectural curved underline SVG component for highlighting text.
 */
export function CurvedUnderline({
  strokeVariant = 'green',
  className = 'absolute inset-x-0 bottom-0 w-full translate-y-1/2',
  width = 223,
  height = 12,
}: CurvedUnderlineProps) {
  const gradientId = 'curved_underline_green_gradient';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 223 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
        stroke={strokeVariant === 'gradient' ? `url(#${gradientId})` : '#15803d'}
        strokeWidth={strokeVariant === 'gradient' ? '3' : '2.5'}
        strokeLinecap="round"
      />
      {strokeVariant === 'gradient' && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="1.11716"
            y1="6"
            x2="221.535"
            y2="6"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#15803d" />
            <stop offset="0.5" stopColor="#22c55e" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
}
