import React from 'react';

interface PeranakanDividerProps {
  className?: string;
  variant?: 'subtle' | 'ornate';
}

export const PeranakanDivider: React.FC<PeranakanDividerProps> = ({ 
  className = '',
  variant = 'subtle'
}) => {
  return (
    <div className={`flex items-center justify-center my-6 text-stone-300 ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-stone-200" />
      
      {variant === 'subtle' ? (
        <div className="flex items-center gap-1.5 px-3">
          <div className="w-1.5 h-1.5 rotate-45 border border-stone-400 bg-stone-100" />
          <div className="w-2.5 h-2.5 rotate-45 border border-rose-400 bg-rose-50" />
          <div className="w-1.5 h-1.5 rotate-45 border border-stone-400 bg-stone-100" />
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4">
          <svg className="w-6 h-6 text-rose-500/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" stroke="currentColor" />
            <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>
      )}

      <div className="h-[1px] flex-1 bg-stone-200" />
    </div>
  );
};
