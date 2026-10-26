import React, { useState } from 'react';
import { SocialEnterprise, Category, BeneficiaryCause } from '../types';
import { 
  Coffee, 
  Heart, 
  Gift, 
  Activity, 
  MapPin, 
  Navigation, 
  Sparkles, 
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface SingaporeMapProps {
  enterprises: SocialEnterprise[];
  selectedEnterprise: SocialEnterprise | null;
  onSelectEnterprise: (enterprise: SocialEnterprise) => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  selectedCause: BeneficiaryCause | 'all';
  setSelectedCause: (cause: BeneficiaryCause | 'all') => void;
  onOpenStory: (enterprise: SocialEnterprise) => void;
  onAddToTrail: (enterprise: SocialEnterprise) => void;
  isInTrail: (enterpriseId: string) => boolean;
}

export const SingaporeMap: React.FC<SingaporeMapProps> = ({
  enterprises,
  selectedEnterprise,
  onSelectEnterprise,
  selectedCategory,
  setSelectedCategory,
  selectedCause,
  setSelectedCause,
  onOpenStory,
  onAddToTrail,
  isInTrail,
}) => {
  const [hoveredEnterprise, setHoveredEnterprise] = useState<SocialEnterprise | null>(null);

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'fnb': return { bg: 'bg-rose-600', text: 'text-rose-600', border: 'border-rose-600', fill: '#E11D48' };
      case 'wellness': return { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', fill: '#059669' };
      case 'gifts': return { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600', fill: '#D97706' };
      case 'experience': return { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600', fill: '#4F46E5' };
    }
  };

  const getCategoryIcon = (category: Category, className = 'w-3.5 h-3.5') => {
    switch (category) {
      case 'fnb': return <Coffee className={className} />;
      case 'wellness': return <Heart className={className} />;
      case 'gifts': return <Gift className={className} />;
      case 'experience': return <Activity className={className} />;
    }
  };

  // Filtered enterprises based on category and cause
  const filteredEnterprises = enterprises.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchCause = selectedCause === 'all' || item.cause === selectedCause;
    return matchCategory && matchCause;
  });

  return (
    <div className="relative w-full bg-stone-100/70 rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Top Filter Bar */}
      <div className="p-4 bg-white/90 backdrop-blur-sm border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-600 ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Places ({enterprises.length})
          </button>
          <button
            onClick={() => setSelectedCategory('fnb')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
              selectedCategory === 'fnb'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>F&amp;B / Cafes</span>
          </button>
          <button
            onClick={() => setSelectedCategory('wellness')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
              selectedCategory === 'wellness'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Wellness &amp; Care</span>
          </button>
          <button
            onClick={() => setSelectedCategory('gifts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
              selectedCategory === 'gifts'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Artisan Gifts</span>
          </button>
          <button
            onClick={() => setSelectedCategory('experience')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
              selectedCategory === 'experience'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Social Movement</span>
          </button>
        </div>

        {/* Cause Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="cause-select" className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Cause:
          </label>
          <select
            id="cause-select"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value as BeneficiaryCause | 'all')}
            className="text-xs font-medium text-stone-800 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
          >
            <option value="all">All Beneficiary Causes</option>
            <option value="neurodiversity">Neurodiversity &amp; Autism</option>
            <option value="disabilities">Physical &amp; Intellectual Disabilities</option>
            <option value="women_youth">Marginalized Women &amp; Youth</option>
            <option value="seniors">Elderly Crafters &amp; Artisans</option>
            <option value="visual_impairment">Visually Impaired Community</option>
          </select>
        </div>
      </div>

      {/* Interactive SVG Singapore Map Container */}
      <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] bg-sky-50/40 p-4 flex items-center justify-center select-none overflow-hidden">
        {/* Geographic Region Backdrop (SVG) */}
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full max-h-full drop-shadow-sm transition-transform duration-300"
          aria-label="Map of Singapore showing social enterprise locations"
        >
          <defs>
            {/* Water gradient */}
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>

            {/* Land pattern */}
            <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>

            {/* Reservoir Green */}
            <linearGradient id="natureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DCFCE7" />
              <stop offset="100%" stopColor="#BBF7D0" />
            </linearGradient>
          </defs>

          {/* Sea backdrop */}
          <rect width="1000" height="600" fill="url(#seaGradient)" opacity="0.35" />

          {/* Straits of Johor divider (North) */}
          <path 
            d="M 50 80 Q 250 110, 480 80 T 800 120 T 950 100" 
            stroke="#94A3B8" 
            strokeWidth="1.5" 
            strokeDasharray="4,4" 
            fill="none" 
            opacity="0.4"
          />

          {/* Main Island of Singapore (Accurate Simplified Silhouette) */}
          <path 
            d="M 120 320 
               C 100 290, 110 240, 160 210 
               C 210 180, 240 190, 310 140 
               C 360 110, 420 100, 480 110 
               C 550 115, 600 135, 670 145 
               C 740 155, 820 180, 870 210 
               C 920 240, 940 280, 920 310 
               C 890 350, 840 370, 780 390 
               C 720 410, 650 430, 580 440 
               C 540 450, 510 430, 470 420 
               C 420 410, 360 410, 300 420 
               C 240 430, 190 410, 150 380 
               Z" 
            fill="url(#islandGradient)" 
            stroke="#CBD5E1" 
            strokeWidth="2.5" 
          />

          {/* Western Island / Jurong Island */}
          <path 
            d="M 180 430 C 170 410, 210 410, 240 430 C 260 450, 230 470, 190 460 Z" 
            fill="#F1F5F9" 
            stroke="#CBD5E1" 
            strokeWidth="1.5" 
          />

          {/* Sentosa Island */}
          <path 
            d="M 470 460 C 460 450, 520 450, 540 465 C 530 480, 480 480, 470 460 Z" 
            fill="#E2E8F0" 
            stroke="#94A3B8" 
            strokeWidth="1.5" 
          />

          {/* Pulau Ubin (North-East) */}
          <path 
            d="M 760 140 C 780 130, 830 140, 840 155 C 810 165, 770 160, 760 140 Z" 
            fill="#F1F5F9" 
            stroke="#CBD5E1" 
            strokeWidth="1.5" 
          />

          {/* Central Catchment Nature Reserve & MacRitchie Reservoir */}
          <path 
            d="M 440 240 C 460 210, 510 200, 540 230 C 560 260, 530 290, 490 280 C 460 270, 430 260, 440 240 Z" 
            fill="url(#natureGradient)" 
            stroke="#86EFAC" 
            strokeWidth="1.5" 
            opacity="0.8"
          />
          <text x="490" y="250" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600" opacity="0.7">
            Central Catchment
          </text>

          {/* Marina Bay & Singapore River Mouth */}
          <path 
            d="M 540 410 Q 560 420, 580 405" 
            stroke="#38BDF8" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
          />

          {/* Region Label Watermarks */}
          <g fill="#94A3B8" fontSize="12" fontWeight="600" opacity="0.6" letterSpacing="1.5">
            <text x="540" y="380" textAnchor="middle">CENTRAL / ORCHARD</text>
            <text x="590" y="425" textAnchor="middle">DOWNTOWN CORE</text>
            <text x="760" y="320" textAnchor="middle">EAST COAST / BEDOK</text>
            <text x="540" y="190" textAnchor="middle">NORTH / AMK</text>
            <text x="320" y="340" textAnchor="middle">WEST / BUONA VISTA</text>
          </g>

          {/* Connecting Trail Lines (If 2 or more enterprises in Trail) */}
          {enterprises.length > 1 && (
            <path
              d="M 520 372 L 560 360 L 530 252 L 740 330 L 570 336"
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2"
              strokeDasharray="4,6"
              opacity="0.4"
            />
          )}

          {/* Interactive Enterprise Location Nodes */}
          {filteredEnterprises.map((enterprise) => {
            const isSelected = selectedEnterprise?.id === enterprise.id;
            const isHovered = hoveredEnterprise?.id === enterprise.id;
            const inTrail = isInTrail(enterprise.id);
            const catColor = getCategoryColor(enterprise.category);
            const safeX = Number.isFinite(Number(enterprise.mapX)) ? Number(enterprise.mapX) : 50;
            const safeY = Number.isFinite(Number(enterprise.mapY)) ? Number(enterprise.mapY) : 50;
            const cx = safeX * 10;
            const cy = safeY * 6;

            return (
              <g 
                key={enterprise.id}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectEnterprise(enterprise)}
                onMouseEnter={() => setHoveredEnterprise(enterprise)}
                onMouseLeave={() => setHoveredEnterprise(null)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${enterprise.name}, located at ${enterprise.district}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectEnterprise(enterprise);
                  }
                }}
              >
                {/* Active Selection Pulse Ring */}
                {isSelected && (
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="24" 
                    fill="none" 
                    stroke={catColor.fill} 
                    strokeWidth="2" 
                    className="animate-ping opacity-75" 
                  />
                )}

                {/* Outer halo */}
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={isSelected ? 18 : isHovered ? 16 : 13} 
                  fill="white" 
                  stroke={catColor.fill} 
                  strokeWidth={isSelected ? 3.5 : 2.5}
                  className="transition-all duration-150 drop-shadow-md"
                />

                {/* Inner Icon Circle */}
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r={isSelected ? 14 : isHovered ? 12 : 9.5} 
                  fill={catColor.fill} 
                  className="transition-all duration-150"
                />

                {/* Bookmark indicator if added to trail */}
                {inTrail && (
                  <circle 
                    cx={cx + 9} 
                    cy={cy - 9} 
                    r="4.5" 
                    fill="#BE123C" 
                    stroke="white" 
                    strokeWidth="1.5" 
                  />
                )}

                {/* Pin Label (Always visible for selected/hovered, or clean abbreviated text) */}
                <text 
                  x={cx} 
                  y={cy + 25} 
                  textAnchor="middle" 
                  className={`text-[11px] font-bold transition-all ${
                    isSelected ? 'fill-slate-950 font-extrabold' : 'fill-slate-700'
                  }`}
                  style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 -1px 3px rgba(255,255,255,0.9)' }}
                >
                  {enterprise.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay at bottom-left */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-stone-200 shadow-sm text-xs space-y-1.5 hidden sm:block">
          <div className="font-semibold text-stone-700 pb-1 border-b border-stone-100 flex items-center justify-between gap-4">
            <span>Singapore Social Map</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">raiSE Verified</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
            <span>F&amp;B &amp; Inclusive Cafes</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>Wellness &amp; Therapy</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span>Artisan Crafts &amp; Gifts</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
            <span>Social Experience &amp; Sports</span>
          </div>
        </div>

        {/* Floating Quick Detail Card when an enterprise is Selected */}
        {selectedEnterprise && (
          <div 
            className="absolute bottom-3 right-3 max-w-sm w-[90%] sm:w-80 bg-white rounded-xl border border-stone-200 shadow-xl p-4 transition-all duration-200"
            role="region"
            aria-label={`Details for ${selectedEnterprise.name}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-rose-600">
                    {selectedEnterprise.category.toUpperCase()}
                  </span>
                  <span>·</span>
                  <span>{selectedEnterprise.district}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedEnterprise.name}
                </h4>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-2 py-0.5 rounded shrink-0">
                ★ {selectedEnterprise.googleRating}
              </span>
            </div>

            <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">
              {selectedEnterprise.tagline}
            </p>

            <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1 truncate max-w-[190px]">
                <Navigation className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">{selectedEnterprise.mrt}</span>
              </span>
              <span className="font-semibold text-emerald-700 shrink-0">
                {selectedEnterprise.impactMetrics.primaryNumber}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => onOpenStory(selectedEnterprise)}
                className="flex-1 py-1.5 px-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Impact Story</span>
              </button>

              <button
                onClick={() => onAddToTrail(selectedEnterprise)}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 focus-visible:ring-2 focus-visible:ring-rose-600 ${
                  isInTrail(selectedEnterprise.id)
                    ? 'bg-stone-900 text-white'
                    : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                }`}
              >
                {isInTrail(selectedEnterprise.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Trail</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Add Trail</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
