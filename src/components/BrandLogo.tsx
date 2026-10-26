import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  className = '',
  showTagline = false 
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }[size];

  const textClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* 
        Custom SVG Motif: Continuous Heart-Stroll Path
        A continuous vector line forming a loving heart that loops inward into a walking trail,
        symbolizing "Doing good while strolling / GaiGai-ing across Singapore".
      */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconDimensions}`}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-rose-600 transition-transform hover:scale-105"
          aria-hidden="true"
        >
          {/* Subtle warm glow circle */}
          <circle cx="24" cy="24" r="22" className="fill-rose-50" />
          
          {/* Continuous Heart-and-Path loop */}
          <path 
            d="M24 38C24 38 10 27.5 10 18C10 12.5 14.5 8 20 8C22.5 8 24 9.5 24 10.5C24 9.5 25.5 8 28 8C33.5 8 38 12.5 38 18C38 27.5 24 38 24 38Z" 
            className="stroke-rose-600 stroke-[3.5] stroke-linecap-round stroke-linejoin-round fill-none" 
          />
          {/* Internal strolling path trail winding upward with heart rhythm */}
          <path 
            d="M17 22C19 24.5 21 21.5 24 24C27 26.5 29 23.5 31 25" 
            className="stroke-emerald-600 stroke-[2.5] stroke-linecap-round stroke-linejoin-round fill-none stroke-dasharray-[1,4]" 
          />
          {/* Stepping dot */}
          <circle cx="24" cy="24" r="2.5" className="fill-emerald-600" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-display font-extrabold tracking-tight text-slate-900 ${textClasses}`}>
            GaiGai
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-600 ml-0.5 mb-1" aria-hidden="true" />
          <span className="ml-1.5 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
            SG
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-stone-500 font-medium">
            Spend with Heart · Discover Local Impact
          </span>
        )}
      </div>
    </div>
  );
};
