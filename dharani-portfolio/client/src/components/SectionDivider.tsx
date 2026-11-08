/**
 * SectionDivider Component
 * Geometric SVG divider for separating sections with Kinetic Engineering aesthetic
 */

interface SectionDividerProps {
  position?: 'top' | 'bottom';
  className?: string;
}

export function SectionDivider({ position = 'bottom', className = '' }: SectionDividerProps) {
  if (position === 'top') {
    return (
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-auto ${className}`}
        style={{ display: 'block' }}
      >
        <path
          d="M0,40 Q300,10 600,40 T1200,40 L1200,0 L0,0 Z"
          fill="currentColor"
          opacity="0.1"
        />
        <path
          d="M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className={`w-full h-auto ${className}`}
      style={{ display: 'block' }}
    >
      <path
        d="M0,60 Q300,30 600,60 T1200,60 L1200,0 L0,0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
