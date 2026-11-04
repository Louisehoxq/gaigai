import React from 'react';
import { SocialEnterprise, Category } from '../types';
import { 
  Navigation, 
  Clock, 
  Globe, 
  BookmarkPlus, 
  BookmarkCheck, 
  Coffee, 
  Heart, 
  Gift, 
  Activity,
  ShieldCheck
} from 'lucide-react';

interface EnterpriseCardProps {
  enterprise: SocialEnterprise;
  isSelected: boolean;
  isInTrail: boolean;
  onSelect: () => void;
  onAddToTrail: () => void;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({
  enterprise,
  isSelected,
  isInTrail,
  onSelect,
  onAddToTrail,
}) => {
  const getCategoryTheme = (category: Category) => {
    switch (category) {
      case 'fnb': return { label: 'F&B & Cafes', icon: Coffee, text: 'text-rose-600' };
      case 'wellness': return { label: 'Wellness & Care', icon: Heart, text: 'text-emerald-700' };
      case 'gifts': return { label: 'Artisan Gifts', icon: Gift, text: 'text-amber-700' };
      case 'experience': return { label: 'Social Movement', icon: Activity, text: 'text-indigo-700' };
    }
  };

  const theme = getCategoryTheme(enterprise.category);
  const CategoryIcon = theme.icon;

  return (
    <article 
      className={`group bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col ${
        isSelected 
          ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-md' 
          : 'border-stone-200 hover:border-stone-300 hover:shadow-sm'
      }`}
    >
      {/* Top Header Section */}
      <div className="p-5 pb-3">
        {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2 flex-wrap gap-1">
          <div className="flex items-center gap-1.5 font-medium">
            <CategoryIcon className={`w-3.5 h-3.5 ${theme.text}`} aria-hidden="true" />
            <span className={`font-semibold ${theme.text}`}>{theme.label}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{enterprise.district}</span>
          </div>

          {/* Clean trust markers */}
          <div className="flex items-center gap-2 text-[11px]">
            {enterprise.raiseTier ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>raiSE: {enterprise.raiseTier}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-stone-500 font-medium">
                <span>raiSE tier: not yet checked</span>
              </span>
            )}
          </div>
        </div>


        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
            <button 
              onClick={onSelect}
              className="text-left focus-visible:ring-2 focus-visible:ring-rose-600 rounded"
            >
              {enterprise.name}
            </button>
          </h3>

        </div>

        {/* Tagline */}
        <p className="text-xs text-rose-700 font-medium mt-1">
          {enterprise.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-stone-600 leading-relaxed mt-2 line-clamp-2">
          {enterprise.description}
        </p>

        <div className="mt-3.5 p-2.5 bg-stone-50/80 rounded-xl border border-stone-200/60 text-xs">
          <span className="block text-[11px] text-stone-500 font-medium">Community supported</span>
          <span className="font-semibold text-emerald-800">{enterprise.causeLabel}</span>
        </div>
      </div>

      {/* Location & MRT Access Strip */}
      <div className="px-5 py-2.5 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-600 space-y-1">
        <div className="flex items-center gap-1.5 truncate">
          <Navigation className="w-3.5 h-3.5 text-rose-600 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-stone-800 truncate">{enterprise.mrt}</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-500 truncate">
          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" aria-hidden="true" />
          <span className="truncate">{enterprise.openingHours}</span>
        </div>
        <p className="text-[11px] text-stone-400">
          Sample details, unverified. Check with the venue before visiting.
        </p>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-4 pt-3 border-t border-stone-200 mt-auto bg-white flex items-center gap-2">
        {/* Add to Weekend Trail */}
        <button
          onClick={onAddToTrail}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
            isInTrail
              ? 'bg-stone-900 text-white'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
          aria-label={isInTrail ? `Remove ${enterprise.name} from trail` : `Add ${enterprise.name} to weekend trail`}
        >
          {isInTrail ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5 text-rose-300" aria-hidden="true" />
              <span>In Trail</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-3.5 h-3.5 text-rose-600" aria-hidden="true" />
              <span>Add Trail</span>
            </>
          )}
        </button>

        <a
          href={enterprise.website}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm focus-visible:ring-2 focus-visible:ring-rose-600 shrink-0"
          aria-label={`Visit ${enterprise.name} website (opens in a new tab)`}
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Website</span>
        </a>
      </div>
    </article>
  );
};
