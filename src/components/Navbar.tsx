import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Sparkles, Heart, Compass, LayoutDashboard, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'directory' | 'stories' | 'about';
  setCurrentTab: (tab: 'map' | 'directory' | 'stories' | 'about') => void;
  isEnterpriseMode: boolean;
  setIsEnterpriseMode: (val: boolean) => void;
  trailCount: number;
  openTrailDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isEnterpriseMode,
  setIsEnterpriseMode,
  trailCount,
  openTrailDrawer,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark & Heart Motif */}
          <button
            onClick={() => {
              setIsEnterpriseMode(false);
              setCurrentTab('map');
            }}
            className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-rose-600 rounded-md p-1 -ml-1 shrink-0"
            aria-label="GaiGai Singapore - Return to Home Map"
          >
            <BrandLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
            aria-label="Primary Navigation"
          >
            <button
              onClick={() => {
                setIsEnterpriseMode(false);
                setCurrentTab('map');
              }}
              className={`hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                !isEnterpriseMode && currentTab === 'map' ? 'text-rose-600 font-semibold border-b-2 border-rose-600 -mb-0.5' : ''
              }`}
            >
              <MapPin className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span>Explore Map</span>
            </button>

            <button
              onClick={() => {
                setIsEnterpriseMode(false);
                setCurrentTab('directory');
              }}
              className={`hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                !isEnterpriseMode && currentTab === 'directory' ? 'text-rose-600 font-semibold border-b-2 border-rose-600 -mb-0.5' : ''
              }`}
            >
              <Compass className="w-4 h-4 text-stone-500" aria-hidden="true" />
              <span>Directory</span>
            </button>

            <button
              onClick={() => {
                setIsEnterpriseMode(false);
                setCurrentTab('about');
              }}
              className={`hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                !isEnterpriseMode && currentTab === 'about' ? 'text-rose-600 font-semibold border-b-2 border-rose-600 -mb-0.5' : ''
              }`}
            >
              <Heart className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>About GaiGai</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Trail Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Trail Bag / Itinerary Button */}
            {!isEnterpriseMode && (
              <button
                onClick={openTrailDrawer}
                className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-600 shrink-0"
                aria-label={`View Weekend GaiGai Trail (${trailCount} spots selected)`}
              >
                <BookmarkCheck className="w-4 h-4 text-rose-600" aria-hidden="true" />
                <span className="hidden sm:inline">Weekend Trail</span>
                <span className="bg-rose-600 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {trailCount}
                </span>
              </button>
            )}

            {/* Enterprise Portal Toggle */}
            <button
              onClick={() => setIsEnterpriseMode(!isEnterpriseMode)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-rose-600 shrink-0 ${
                isEnterpriseMode
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
              <span>{isEnterpriseMode ? 'Back to GaiGai' : 'Enterprise Portal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sub-Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 bg-stone-50 px-2 py-1.5">
        <button
          onClick={() => {
            setIsEnterpriseMode(false);
            setCurrentTab('map');
          }}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium ${
            !isEnterpriseMode && currentTab === 'map' ? 'text-rose-600 font-bold' : 'text-stone-600'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Map</span>
        </button>
        <button
          onClick={() => {
            setIsEnterpriseMode(false);
            setCurrentTab('directory');
          }}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium ${
            !isEnterpriseMode && currentTab === 'directory' ? 'text-rose-600 font-bold' : 'text-stone-600'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Places</span>
        </button>
        <button
          onClick={() => {
            setIsEnterpriseMode(false);
            setCurrentTab('about');
          }}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium ${
            !isEnterpriseMode && currentTab === 'about' ? 'text-rose-600 font-bold' : 'text-stone-600'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>About</span>
        </button>
      </div>
    </header>
  );
};
