import React from 'react';

interface PenIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function PenIllustration({ className, style }: PenIllustrationProps) {
  return (
    <svg 
      className={className}
      style={style}
      viewBox="0 0 60 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shadowWrap" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="15" dy="25" stdDeviation="15" floodColor="rgba(0,0,0,0.15)" />
        </filter>
        <linearGradient id="metal" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#999" />
          <stop offset="0.5" stopColor="#f0f0f0" />
          <stop offset="1" stopColor="#888" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="15" y1="0" x2="45" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d0d0d" />
          <stop offset="0.3" stopColor="#303030" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
      </defs>

      {/* Group pen with a combined dropshadow */}
      <g filter="url(#shadowWrap)">
        {/* Main Body (Resin/Black material) */}
        <path d="M 20 20 C 20 0 40 0 40 20 L 37 380 L 23 380 Z" fill="url(#bodyGradient)" />
        
        {/* Top Cap Jewel / Ring */}
        <path d="M 21 35 L 39 35" stroke="url(#metal)" strokeWidth="2" />
        <path d="M 20 20 L 40 20" stroke="url(#metal)" strokeWidth="4" />
        
        {/* Pen Clip */}
        <path d="M 28 20 C 28 20 32 30 32 40 L 31 160 C 31 165 29 165 29 160 L 28 40 Z" fill="url(#metal)" />
        <circle cx="30" cy="155" r="3" fill="url(#metal)" />

        {/* Center Metal Band (Trim) */}
        <rect x="23" y="240" width="14" height="15" fill="url(#metal)" />
        <rect x="23" y="245" width="14" height="2" fill="#0d0d0d" opacity="0.5" />
        <rect x="23" y="250" width="14" height="1" fill="#0d0d0d" opacity="0.5" />

        {/* Section (Grip) */}
        <path d="M 23 380 C 23 390 26 420 27 420 C 28 420 32 420 33 420 C 34 420 37 390 37 380 Z" fill="#111" />
        
        {/* Trim ring before nib */}
        <rect x="26.5" y="420" width="7" height="4" fill="url(#metal)" />

        {/* Nib (The writing point) */}
        <path d="M 26.5 423 L 30 485 L 33.5 423 Z" fill="url(#metal)" />
        
        {/* Nib details (breather hole & slit) */}
        <circle cx="30" cy="445" r="1.5" fill="#0d0d0d" />
        <line x1="30" y1="445" x2="30" y2="485" stroke="#0d0d0d" strokeWidth="1" />
      </g>
    </svg>
  );
}
