import React, { useState, useEffect } from 'react';
import { 
  SocialEnterprise, 
  DonationRecord, 
  Category, 
  BeneficiaryCause 
} from './types';
import { SOCIAL_ENTERPRISES, INITIAL_DONATION_RECORDS } from './data/socialEnterprises';
import { Navbar } from './components/Navbar';
import { SingaporeGoogleMap } from './components/SingaporeGoogleMap';
import { SingaporeMap } from './components/SingaporeMap';
import { SearchFilterBar } from './components/SearchFilterBar';
import { EnterpriseCard } from './components/EnterpriseCard';
import { StoryModal } from './components/StoryModal';
import { TrailDrawer } from './components/TrailDrawer';
import { DonationModal } from './components/DonationModal';
import { EnterpriseDashboard } from './components/EnterpriseDashboard';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PeranakanDivider } from './components/PeranakanDivider';
import { 
  Search, 
  Sparkles, 
  Compass, 
  MapPin, 
  Heart, 
  Coffee, 
  Gift, 
  Activity, 
  ShieldCheck, 
  Users, 
  DollarSign,
  ArrowRight,
  BookmarkPlus,
  Layers
} from 'lucide-react';

export default function App() {
  // Google Maps Quota State
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Persistent or default enterprises with deep coordinate validation
  const [enterprises, setEnterprises] = useState<SocialEnterprise[]>(() => {
    try {
      const saved = localStorage.getItem('gaigai_enterprises');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => {
            const defaultItem = SOCIAL_ENTERPRISES.find((s) => s.id === item.id);
            const rawLat = parseFloat(String(item.lat));
            const rawLng = parseFloat(String(item.lng));
            const rawMapX = parseFloat(String(item.mapX));
            const rawMapY = parseFloat(String(item.mapY));

            const validLat = Number.isFinite(rawLat) && rawLat > 1.0 && rawLat < 1.6
              ? rawLat
              : (defaultItem?.lat ?? 1.3521);
            const validLng = Number.isFinite(rawLng) && rawLng > 103.5 && rawLng < 104.2
              ? rawLng
              : (defaultItem?.lng ?? 103.8198);
            const validMapX = Number.isFinite(rawMapX) ? rawMapX : (defaultItem?.mapX ?? 50);
            const validMapY = Number.isFinite(rawMapY) ? rawMapY : (defaultItem?.mapY ?? 50);

            return {
              ...(defaultItem || {}),
              ...item,
              lat: validLat,
              lng: validLng,
              mapX: validMapX,
              mapY: validMapY,
              offerings: Array.isArray(item.offerings) ? item.offerings : (defaultItem?.offerings ?? []),
              storyChapters: Array.isArray(item.storyChapters) ? item.storyChapters : (defaultItem?.storyChapters ?? []),
              googleReviews: Array.isArray(item.googleReviews) ? item.googleReviews : (defaultItem?.googleReviews ?? []),
            };
          });
        }
      }
      return SOCIAL_ENTERPRISES;
    } catch {
      return SOCIAL_ENTERPRISES;
    }
  });

  // Persistent donation records
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('gaigai_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATION_RECORDS;
    } catch {
      return INITIAL_DONATION_RECORDS;
    }
  });

  // Weekend trail saved enterprise IDs
  const [trailIds, setTrailIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gaigai_trail_ids');
      return saved ? JSON.parse(saved) : ['foreword-coffee', 'teddythotz', 'savh-massage'];
    } catch {
      return ['foreword-coffee', 'teddythotz', 'savh-massage'];
    }
  });

  // Navigation states
  const [currentTab, setCurrentTab] = useState<'map' | 'directory' | 'stories' | 'about'>('map');
  const [isEnterpriseMode, setIsEnterpriseMode] = useState<boolean>(false);
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>(enterprises[0]?.id || 'foreword-coffee');
  const [portalEnterpriseId, setPortalEnterpriseId] = useState<string>(enterprises[0]?.id || 'foreword-coffee');

  // Map engine toggle: default to google maps
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCause, setSelectedCause] = useState<BeneficiaryCause | 'all'>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [activeStoryEnterprise, setActiveStoryEnterprise] = useState<SocialEnterprise | null>(null);

  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [activeDonationEnterprise, setActiveDonationEnterprise] = useState<SocialEnterprise | null>(null);

  const [isTrailDrawerOpen, setIsTrailDrawerOpen] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gaigai_enterprises', JSON.stringify(enterprises));
    } catch (e) {
      console.error('Failed to sync enterprises', e);
    }
  }, [enterprises]);

  useEffect(() => {
    try {
      localStorage.setItem('gaigai_donations', JSON.stringify(donationRecords));
    } catch (e) {
      console.error('Failed to sync donations', e);
    }
  }, [donationRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('gaigai_trail_ids', JSON.stringify(trailIds));
    } catch (e) {
      console.error('Failed to sync trail', e);
    }
  }, [trailIds]);

  // Trail management helpers
  const handleToggleTrail = (enterprise: SocialEnterprise) => {
    if (trailIds.includes(enterprise.id)) {
      setTrailIds(trailIds.filter((id) => id !== enterprise.id));
    } else {
      setTrailIds([...trailIds, enterprise.id]);
    }
  };

  const handleMoveTrailUp = (index: number) => {
    if (index <= 0) return;
    const newIds = [...trailIds];
    const temp = newIds[index - 1];
    newIds[index - 1] = newIds[index];
    newIds[index] = temp;
    setTrailIds(newIds);
  };

  const handleMoveTrailDown = (index: number) => {
    if (index >= trailIds.length - 1) return;
    const newIds = [...trailIds];
    const temp = newIds[index + 1];
    newIds[index + 1] = newIds[index];
    newIds[index] = temp;
    setTrailIds(newIds);
  };

  const handleClearTrail = () => {
    setTrailIds([]);
  };

  // Enterprise update in portal with coordinate preservation
  const handleUpdateEnterprise = (updated: SocialEnterprise) => {
    const defaultItem = SOCIAL_ENTERPRISES.find((s) => s.id === updated.id);
    const rawLat = parseFloat(String(updated.lat));
    const rawLng = parseFloat(String(updated.lng));
    const safeUpdated: SocialEnterprise = {
      ...updated,
      lat: Number.isFinite(rawLat) ? rawLat : (defaultItem?.lat ?? 1.3521),
      lng: Number.isFinite(rawLng) ? rawLng : (defaultItem?.lng ?? 103.8198),
      mapX: Number.isFinite(Number(updated.mapX)) ? Number(updated.mapX) : (defaultItem?.mapX ?? 50),
      mapY: Number.isFinite(Number(updated.mapY)) ? Number(updated.mapY) : (defaultItem?.mapY ?? 50),
    };
    setEnterprises((prev) =>
      prev.map((item) => (item.id === safeUpdated.id ? safeUpdated : item))
    );
  };

  // Review reply handler
  const handleAddReviewResponse = (
    enterpriseId: string,
    reviewId: string,
    response: string
  ) => {
    setEnterprises((prev) =>
      prev.map((ent) => {
        if (ent.id !== enterpriseId) return ent;
        return {
          ...ent,
          googleReviews: ent.googleReviews.map((r) =>
            r.id === reviewId ? { ...r, ownerResponse: response } : r
          ),
        };
      })
    );
  };

  // Donation success handler
  const handleDonationSuccess = (newRecord: DonationRecord) => {
    setDonationRecords((prev) => [newRecord, ...prev]);
    // Increment raised funds for target enterprise
    setEnterprises((prev) =>
      prev.map((ent) => {
        if (ent.id === newRecord.enterpriseId) {
          return {
            ...ent,
            currentRaised: ent.currentRaised + newRecord.amount,
          };
        }
        return ent;
      })
    );
  };

  // Filtered enterprises based on category, cause, neighborhood, and search query
  const filteredEnterprises = enterprises.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchCause = selectedCause === 'all' || item.cause === selectedCause;
    const matchNeighborhood = 
      selectedNeighborhood === 'all' || 
      item.district.toLowerCase().includes(selectedNeighborhood.toLowerCase()) ||
      item.address.toLowerCase().includes(selectedNeighborhood.toLowerCase());

    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.causeLabel.toLowerCase().includes(q) ||
      item.offerings.some((o) => o.name.toLowerCase().includes(q) || o.description.toLowerCase().includes(q));

    return matchCategory && matchCause && matchNeighborhood && matchSearch;
  });

  const selectedEnterprise = enterprises.find((e) => e.id === selectedEnterpriseId) || null;
  const trailEnterprises = trailIds
    .map((id) => enterprises.find((e) => e.id === id))
    .filter((e): e is SocialEnterprise => e !== undefined);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isEnterpriseMode={isEnterpriseMode}
        setIsEnterpriseMode={setIsEnterpriseMode}
        trailCount={trailIds.length}
        openTrailDrawer={() => setIsTrailDrawerOpen(true)}
      />

      {/* Google Maps Tier 2 Quota Defense Notice (Section 8) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-18 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1" role="main">
        {isEnterpriseMode ? (
          /* Enterprise Partner Management Portal */
          <EnterpriseDashboard
            enterprises={enterprises}
            selectedEnterpriseId={portalEnterpriseId}
            onSelectEnterprise={setPortalEnterpriseId}
            donationRecords={donationRecords}
            onUpdateEnterprise={handleUpdateEnterprise}
            onAddReviewResponse={handleAddReviewResponse}
          />
        ) : (
          /* Consumer Discovery View */
          <div>
            {/* Singapore Civic Hero Banner */}
            <section className="relative overflow-hidden bg-white border-b border-stone-200">
              {/* Subtle Peranakan geometric background flourish */}
              <div 
                className="absolute right-0 top-0 w-96 h-96 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#E11D48 1.5px, transparent 1.5px)`,
                  backgroundSize: '16px 16px'
                }}
                aria-hidden="true"
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                <div className="max-w-3xl space-y-4">
                  {/* Subtle Kicker */}
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                    <span>Passion Made Possible · Spend with Heart</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                    Discover Where Your Spend Changes Lives in Singapore.
                  </h1>

                  <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
                    Explore verified local social enterprises across F&amp;B, wellness, artisan gifts, and sports. Have the agency to string together a meaningful weekend GaiGai trail where every dollar directly supports disadvantaged communities.
                  </p>

                  {/* Search and Multi-Facet Filters */}
                  <div className="pt-2">
                    <SearchFilterBar
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedNeighborhood={selectedNeighborhood}
                      setSelectedNeighborhood={setSelectedNeighborhood}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      selectedCause={selectedCause}
                      setSelectedCause={setSelectedCause}
                      onSearchSubmit={() => setCurrentTab('map')}
                      onResetFilters={() => {
                        setSearchQuery('');
                        setSelectedNeighborhood('all');
                        setSelectedCategory('all');
                        setSelectedCause('all');
                      }}
                    />
                  </div>

                  {/* Singapore Civic Trust Metric Strip */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>10 raiSE Verified Enterprises</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-rose-700 font-semibold">
                      <Heart className="w-4 h-4 text-rose-600" />
                      <span>100% Inclusive Employment</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      <span className="tabular-nums">${enterprises.reduce((acc, curr) => acc + curr.currentRaised, 0).toLocaleString()} SGD Raised</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* View Selector Tabs (Desktop / Tablets) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab('map')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
                      currentTab === 'map'
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Interactive Map &amp; Trail</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('directory')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
                      currentTab === 'directory'
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>All Places ({filteredEnterprises.length})</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('about')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 ${
                      currentTab === 'about'
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 text-emerald-600" />
                    <span>About GaiGai</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {currentTab === 'map' && (
                    <div className="flex items-center gap-1 p-1 bg-white border border-stone-200 rounded-xl text-xs font-medium">
                      <button
                        onClick={() => setUseGoogleMaps(true)}
                        className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                          useGoogleMaps
                            ? 'bg-stone-900 text-white shadow-sm'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Google Maps</span>
                      </button>
                      <button
                        onClick={() => setUseGoogleMaps(false)}
                        className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                          !useGoogleMaps
                            ? 'bg-stone-900 text-white shadow-sm'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5 text-stone-500" />
                        <span>Regional Vector</span>
                      </button>
                    </div>
                  )}

                  <div className="text-xs text-stone-500 hidden sm:block">
                    Showing <strong>{filteredEnterprises.length}</strong> of <strong>{enterprises.length}</strong> social enterprises
                  </div>
                </div>
              </div>
            </div>

            {/* Tab 1: Interactive Map View */}
            {currentTab === 'map' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {useGoogleMaps ? (
                  /* Accurate Google Maps API View */
                  <SingaporeGoogleMap
                    enterprises={filteredEnterprises}
                    selectedEnterprise={selectedEnterprise}
                    onSelectEnterprise={(ent) => setSelectedEnterpriseId(ent.id)}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCause={selectedCause}
                    setSelectedCause={setSelectedCause}
                    onOpenStory={(ent) => {
                      setActiveStoryEnterprise(ent);
                      setIsStoryModalOpen(true);
                    }}
                    onAddToTrail={handleToggleTrail}
                    isInTrail={(id) => trailIds.includes(id)}
                    onFallbackToVector={() => setUseGoogleMaps(false)}
                  />
                ) : (
                  /* Stylized Regional Vector Map */
                  <SingaporeMap
                    enterprises={filteredEnterprises}
                    selectedEnterprise={selectedEnterprise}
                    onSelectEnterprise={(ent) => setSelectedEnterpriseId(ent.id)}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedCause={selectedCause}
                    setSelectedCause={setSelectedCause}
                    onOpenStory={(ent) => {
                      setActiveStoryEnterprise(ent);
                      setIsStoryModalOpen(true);
                    }}
                    onAddToTrail={handleToggleTrail}
                    isInTrail={(id) => trailIds.includes(id)}
                  />
                )}

                {/* Selected Enterprise Spotlight or Directory Grid below Map */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {selectedCategory === 'all' ? 'Featured Places in Singapore' : `${selectedCategory.toUpperCase()} Social Enterprises`}
                      </h2>
                      <p className="text-xs text-stone-500">
                        Click any map node above to pinpoint location or select an enterprise below
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentTab('directory')}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                    >
                      <span>View Full Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEnterprises.map((enterprise) => (
                      <EnterpriseCard
                        key={enterprise.id}
                        enterprise={enterprise}
                        isSelected={selectedEnterpriseId === enterprise.id}
                        isInTrail={trailIds.includes(enterprise.id)}
                        onSelect={() => setSelectedEnterpriseId(enterprise.id)}
                        onOpenStory={() => {
                          setActiveStoryEnterprise(enterprise);
                          setIsStoryModalOpen(true);
                        }}
                        onAddToTrail={() => handleToggleTrail(enterprise)}
                        onOpenDonation={() => {
                          setActiveDonationEnterprise(enterprise);
                          setIsDonationModalOpen(true);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Full Directory View */}
            {currentTab === 'directory' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Filter Toolbar */}
                <div className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      All ({enterprises.length})
                    </button>
                    <button
                      onClick={() => setSelectedCategory('fnb')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                        selectedCategory === 'fnb'
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      <Coffee className="w-3.5 h-3.5" />
                      <span>F&amp;B / Cafes</span>
                    </button>
                    <button
                      onClick={() => setSelectedCategory('wellness')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                        selectedCategory === 'wellness'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Wellness &amp; Care</span>
                    </button>
                    <button
                      onClick={() => setSelectedCategory('gifts')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                        selectedCategory === 'gifts'
                          ? 'bg-amber-600 text-white'
                          : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Artisan Gifts</span>
                    </button>
                    <button
                      onClick={() => setSelectedCategory('experience')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                        selectedCategory === 'experience'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Movement &amp; Sports</span>
                    </button>
                  </div>

                  {/* Beneficiary Filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Cause:
                    </span>
                    <select
                      value={selectedCause}
                      onChange={(e) => setSelectedCause(e.target.value as BeneficiaryCause | 'all')}
                      className="text-xs font-semibold text-stone-800 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
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

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEnterprises.map((enterprise) => (
                    <EnterpriseCard
                      key={enterprise.id}
                      enterprise={enterprise}
                      isSelected={selectedEnterpriseId === enterprise.id}
                      isInTrail={trailIds.includes(enterprise.id)}
                      onSelect={() => setSelectedEnterpriseId(enterprise.id)}
                      onOpenStory={() => {
                        setActiveStoryEnterprise(enterprise);
                        setIsStoryModalOpen(true);
                      }}
                      onAddToTrail={() => handleToggleTrail(enterprise)}
                      onOpenDonation={() => {
                        setActiveDonationEnterprise(enterprise);
                        setIsDonationModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Animated Stories Showcase */}
            {currentTab === 'stories' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Animated Impact Chronicles</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Behind the Counter: Stories of Dignity &amp; Purpose
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Step inside the daily journeys of inclusive baristas, elderly artisans, and differently-abled entrepreneurs creating a kinder Singapore.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enterprises.map((enterprise) => (
                    <div 
                      key={enterprise.id}
                      className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                          <span className="font-semibold text-rose-700 uppercase">
                            {enterprise.category.toUpperCase()}
                          </span>
                          <span>{enterprise.storyChapters.length} Chapters</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {enterprise.name}
                        </h3>

                        <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                          {enterprise.storyChapters[0]?.narrative || enterprise.description}
                        </p>

                        {enterprise.storyChapters[0]?.quote && (
                          <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs italic text-stone-700">
                            "{enterprise.storyChapters[0].quote}"
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-800">
                          {enterprise.impactMetrics.primaryNumber} {enterprise.impactMetrics.primaryLabel}
                        </span>

                        <button
                          onClick={() => {
                            setActiveStoryEnterprise(enterprise);
                            setIsStoryModalOpen(true);
                          }}
                          className="py-2 px-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>View Story</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: About Section */}
            {currentTab === 'about' && (
              <AboutSection
                onExploreMap={() => setCurrentTab('map')}
                onOpenTrail={() => setIsTrailDrawerOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          setIsEnterpriseMode(false);
          setCurrentTab(tab);
        }}
        onOpenEnterprise={() => setIsEnterpriseMode(true)}
      />

      {/* Animated Story Modal */}
      {isStoryModalOpen && activeStoryEnterprise && (
        <StoryModal
          enterprise={activeStoryEnterprise}
          onClose={() => setIsStoryModalOpen(false)}
          onAddToTrail={handleToggleTrail}
          isInTrail={trailIds.includes(activeStoryEnterprise.id)}
          onOpenDonation={(ent) => {
            setActiveDonationEnterprise(ent);
            setIsDonationModalOpen(true);
          }}
        />
      )}

      {/* Direct Impact Donation Modal */}
      {isDonationModalOpen && (
        <DonationModal
          enterprise={activeDonationEnterprise}
          allEnterprises={enterprises}
          onClose={() => setIsDonationModalOpen(false)}
          onSuccess={handleDonationSuccess}
        />
      )}

      {/* Weekend GaiGai Trail Drawer */}
      <TrailDrawer
        isOpen={isTrailDrawerOpen}
        onClose={() => setIsTrailDrawerOpen(false)}
        trailEnterprises={trailEnterprises}
        onRemoveFromTrail={(id) => setTrailIds(trailIds.filter((tid) => tid !== id))}
        onMoveUp={handleMoveTrailUp}
        onMoveDown={handleMoveTrailDown}
        onClearTrail={handleClearTrail}
        onOpenStory={(ent) => {
          setActiveStoryEnterprise(ent);
          setIsStoryModalOpen(true);
        }}
        onOpenDonation={(ent) => {
          setActiveDonationEnterprise(ent);
          setIsDonationModalOpen(true);
        }}
      />
    </div>
  );
}
