import React, { useState, useEffect, useMemo } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin,
  InfoWindow 
} from '@vis.gl/react-google-maps';
import { SocialEnterprise, Category, BeneficiaryCause } from '../types';
import { 
  Coffee, 
  Heart, 
  Gift, 
  Activity, 
  MapPin, 
  Navigation, 
  Sparkles, 
  CheckCircle2, 
  Filter,
  ExternalLink
} from 'lucide-react';

interface SingaporeGoogleMapProps {
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
  onFallbackToVector?: () => void;
}

const SINGAPORE_CENTER = { lat: 1.3521, lng: 103.8198 };
const DEFAULT_ZOOM = 12;

export const SingaporeGoogleMap: React.FC<SingaporeGoogleMapProps> = ({
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
  onFallbackToVector,
}) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(
    selectedEnterprise ? selectedEnterprise.id : null
  );
  const [mapLoadError, setMapLoadError] = useState<boolean>(false);

  // Sync activeMarkerId whenever external selectedEnterprise changes
  useEffect(() => {
    if (selectedEnterprise) {
      setActiveMarkerId(selectedEnterprise.id);
    }
  }, [selectedEnterprise]);

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const getCategoryTheme = (category: Category) => {
    switch (category) {
      case 'fnb': 
        return { 
          background: '#E11D48', 
          borderColor: '#9F1239', 
          glyphColor: '#FFFFFF',
          badgeClass: 'bg-rose-50 text-rose-800'
        };
      case 'wellness': 
        return { 
          background: '#059669', 
          borderColor: '#065F46', 
          glyphColor: '#FFFFFF',
          badgeClass: 'bg-emerald-50 text-emerald-800'
        };
      case 'gifts': 
        return { 
          background: '#D97706', 
          borderColor: '#92400E', 
          glyphColor: '#FFFFFF',
          badgeClass: 'bg-amber-50 text-amber-800'
        };
      case 'experience': 
        return { 
          background: '#4F46E5', 
          borderColor: '#3730A3', 
          glyphColor: '#FFFFFF',
          badgeClass: 'bg-indigo-50 text-indigo-800'
        };
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'fnb': return <Coffee className="w-3.5 h-3.5" />;
      case 'wellness': return <Heart className="w-3.5 h-3.5" />;
      case 'gifts': return <Gift className="w-3.5 h-3.5" />;
      case 'experience': return <Activity className="w-3.5 h-3.5" />;
    }
  };

  // Sanitize coordinates to ensure only valid finite numbers in Singapore bounds
  const validEnterprises = useMemo(() => {
    return enterprises
      .map((item) => {
        const lat = typeof item.lat === 'number' ? item.lat : parseFloat(String(item.lat));
        const lng = typeof item.lng === 'number' ? item.lng : parseFloat(String(item.lng));
        return {
          ...item,
          lat,
          lng,
        };
      })
      .filter((item) => {
        return (
          Number.isFinite(item.lat) && 
          Number.isFinite(item.lng) && 
          item.lat > 1.0 && 
          item.lat < 1.6 && 
          item.lng > 103.5 && 
          item.lng < 104.2
        );
      });
  }, [enterprises]);

  // Filtered list by category and cause
  const filteredEnterprises = useMemo(() => {
    return validEnterprises.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchCause = selectedCause === 'all' || item.cause === selectedCause;
      return matchCategory && matchCause;
    });
  }, [validEnterprises, selectedCategory, selectedCause]);

  const activeEnterprise = useMemo(() => {
    return validEnterprises.find((e) => e.id === activeMarkerId) || null;
  }, [validEnterprises, activeMarkerId]);

  return (
    <div className="relative w-full bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
      {/* Filter Toolbar at top of map */}
      <div className="p-4 bg-white/95 backdrop-blur-sm border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 z-10">
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
            All Places ({validEnterprises.length})
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
          <label htmlFor="map-cause-select" className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Cause:
          </label>
          <select
            id="map-cause-select"
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

      {/* Google Maps Viewport with APIProvider */}
      <div className="relative w-full h-[520px] sm:h-[580px] md:h-[620px]">
        {mapLoadError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-50 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-600" />
            </div>
            <div className="max-w-md space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Google Maps Frame Notice</h3>
              <p className="text-xs text-stone-500">
                Maps Platform connection was interrupted or blocked by browser settings. You can switch to our high-fidelity Singapore Regional Vector Map anytime.
              </p>
            </div>
            {onFallbackToVector && (
              <button
                type="button"
                onClick={onFallbackToVector}
                className="py-2.5 px-4 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Switch to Regional Vector Map</span>
              </button>
            )}
          </div>
        ) : (
          <APIProvider 
            apiKey={apiKey} 
            region="SG" 
            language="en"
            onError={(err) => {
              console.warn('Google Maps API load error:', err);
              setMapLoadError(true);
            }}
          >
            <Map
              defaultCenter={SINGAPORE_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              mapId="DEMO_MAP_ID"
              gestureHandling="cooperative"
              disableDefaultUI={false}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            >
              {/* Render Advanced Markers for each social enterprise with sanitized coordinates */}
              {filteredEnterprises.map((enterprise) => {
                const theme = getCategoryTheme(enterprise.category);
                const isSelected = selectedEnterprise?.id === enterprise.id || activeMarkerId === enterprise.id;

                return (
                  <AdvancedMarker
                    key={enterprise.id}
                    position={{ lat: Number(enterprise.lat), lng: Number(enterprise.lng) }}
                    onClick={() => {
                      setActiveMarkerId(enterprise.id);
                      onSelectEnterprise(enterprise);
                    }}
                    title={`${enterprise.name} · ${enterprise.district}`}
                  >
                    <Pin
                      background={theme.background}
                      borderColor={isSelected ? '#0F172A' : theme.borderColor}
                      glyphColor={theme.glyphColor}
                      scale={isSelected ? 1.25 : 1.05}
                    />
                  </AdvancedMarker>
                );
              })}

              {/* InfoWindow for active selected enterprise */}
              {activeEnterprise && Number.isFinite(Number(activeEnterprise.lat)) && Number.isFinite(Number(activeEnterprise.lng)) && (
                <InfoWindow
                  position={{ lat: Number(activeEnterprise.lat), lng: Number(activeEnterprise.lng) }}
                  onCloseClick={() => setActiveMarkerId(null)}
                  headerContent={
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 pr-2">
                      <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
                      <span>{activeEnterprise.name}</span>
                    </div>
                  }
                >
                  <div className="max-w-xs p-1 space-y-2 text-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="font-semibold text-rose-600 uppercase">
                        {activeEnterprise.category.toUpperCase()}
                      </span>
                      <span>★ {activeEnterprise.googleRating} ({activeEnterprise.reviewCount})</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-snug">
                      {activeEnterprise.tagline}
                    </p>

                    <div className="p-1.5 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-rose-600 shrink-0" />
                      <span className="truncate">{activeEnterprise.mrt}</span>
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => onOpenStory(activeEnterprise)}
                        className="flex-1 py-1 px-2 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded transition-colors flex items-center justify-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Story</span>
                      </button>

                      <button
                        onClick={() => onAddToTrail(activeEnterprise)}
                        className={`flex-1 py-1 px-2 text-[11px] font-semibold rounded transition-colors flex items-center justify-center gap-1 ${
                          isInTrail(activeEnterprise.id)
                            ? 'bg-stone-900 text-white'
                            : 'bg-rose-600 text-white hover:bg-rose-700'
                        }`}
                      >
                        {isInTrail(activeEnterprise.id) ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>In Trail</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3" />
                            <span>Add Trail</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        )}

        {/* Legend Overlay at bottom-left */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-stone-200 shadow-md text-xs space-y-1.5 hidden sm:block z-10 pointer-events-auto">
          <div className="font-semibold text-stone-800 pb-1 border-b border-stone-100 flex items-center justify-between gap-4">
            <span>Google Maps Singapore</span>
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">raiSE Verified</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
            <span>F&amp;B / Cafes ({enterprises.filter(e => e.category === 'fnb').length})</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>Wellness &amp; Care ({enterprises.filter(e => e.category === 'wellness').length})</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span>Artisan Gifts ({enterprises.filter(e => e.category === 'gifts').length})</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
            <span>Social Movement ({enterprises.filter(e => e.category === 'experience').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
