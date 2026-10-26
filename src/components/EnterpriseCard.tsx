import React from 'react';
import { SocialEnterprise, Category } from '../types';
import { 
  Navigation, 
  Clock, 
  Phone, 
  Globe, 
  Sparkles, 
  BookmarkPlus, 
  BookmarkCheck, 
  HeartHandshake, 
  Coffee, 
  Heart, 
  Gift, 
  Activity,
  Star,
  ShieldCheck,
  Award
} from 'lucide-react';

interface EnterpriseCardProps {
  enterprise: SocialEnterprise;
  isSelected: boolean;
  isInTrail: boolean;
  onSelect: () => void;
  onOpenStory: () => void;
  onAddToTrail: () => void;
  onOpenDonation: () => void;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({
  enterprise,
  isSelected,
  isInTrail,
  onSelect,
  onOpenStory,
  onAddToTrail,
  onOpenDonation,
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
            {enterprise.verifiedRaiSE && (
              <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>raiSE Verified</span>
              </span>
            )}
            {enterprise.enablingMark && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="inline-flex items-center gap-1 text-stone-600 font-medium">
                  <Award className="w-3 h-3 text-amber-600" aria-hidden="true" />
                  <span>{enterprise.enablingMark}</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Enterprise Title & Google Reviews Badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
            <button 
              onClick={onSelect}
              className="text-left focus-visible:ring-2 focus-visible:ring-rose-600 rounded"
            >
              {enterprise.name}
            </button>
          </h3>

          {/* Google Review summary */}
          <div className="flex items-center gap-1 shrink-0 text-xs text-stone-700 bg-stone-50 border border-stone-200/80 px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-bold tabular-nums">{enterprise.googleRating}</span>
            <span className="text-stone-400">({enterprise.reviewCount})</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-rose-700 font-medium mt-1">
          {enterprise.tagline}
        </p>

        {/* Description */}
        <p className="text-xs text-stone-600 leading-relaxed mt-2 line-clamp-2">
          {enterprise.description}
        </p>

        {/* Tangible Social Impact Summary Strip */}
        <div className="mt-3.5 p-2.5 bg-stone-50/80 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs">
          <div>
            <span className="block text-[11px] text-stone-500 font-medium">Primary Impact</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {enterprise.impactMetrics.primaryNumber} {enterprise.impactMetrics.primaryLabel}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-stone-500 font-medium">Community</span>
            <span className="font-semibold text-emerald-800">
              {enterprise.causeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Offerings Showcase (Products / Services) */}
      <div className="px-5 py-3 border-t border-stone-100 bg-white/50">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
          Featured Offerings &amp; Experiences:
        </span>
        <div className="space-y-1.5">
          {enterprise.offerings.slice(0, 2).map((offering) => (
            <div key={offering.id} className="flex items-baseline justify-between text-xs gap-2">
              <span className="text-stone-800 font-medium truncate">
                {offering.name}
              </span>
              <span className="text-slate-900 font-bold tabular-nums shrink-0">
                {offering.price}
              </span>
            </div>
          ))}
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
      </div>

      {/* Action Footer Buttons */}
      <div className="p-4 pt-3 border-t border-stone-200 mt-auto bg-white flex items-center gap-2">
        {/* Animated Story Button */}
        <button
          onClick={onOpenStory}
          className="flex-1 py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600"
          aria-label={`Read animated impact story of ${enterprise.name}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
          <span>Story</span>
        </button>

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

        {/* Direct Donation / Support */}
        <button
          onClick={onOpenDonation}
          className="py-2 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm focus-visible:ring-2 focus-visible:ring-rose-600 shrink-0"
          aria-label={`Donate or support ${enterprise.name}`}
        >
          <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Support</span>
        </button>
      </div>
    </article>
  );
};
