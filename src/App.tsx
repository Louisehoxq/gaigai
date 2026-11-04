import React, { useState, useEffect } from 'react';
import { 
  SocialEnterprise, 
  Category, 
  BeneficiaryCause 
} from './types';
import { SOCIAL_ENTERPRISES } from './data/socialEnterprises';
import { Navbar } from './components/Navbar';
import { SingaporeGoogleMap } from './components/SingaporeGoogleMap';
import { SingaporeMap } from './components/SingaporeMap';
import { SearchFilterBar } from './components/SearchFilterBar';
import { EnterpriseCard } from './components/EnterpriseCard';
import { TrailDrawer } from './components/TrailDrawer';
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
  ArrowRight,
  BookmarkPlus,
  Layers
} from 'lucide-react';

export default function App() {
  // Drop data persisted by earlier prototype versions (it contained invented
  // reviews, donations and metrics that would otherwise survive code fixes).
  useEffect(() => {
    try {
      localStorage.removeItem('gaigai_enterprises');
      localStorage.removeItem('gaigai_donations');
    } catch {
      /* storage unavailable: nothing to clean */
    }
  }, []);

  // Google Maps Quota State
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Enterprises come from the data file. They are not persisted in the browser:
  // persisting copies made old (invented) fields survive data fixes.
  const [enterprises] = useState<SocialEnterprise[]>(SOCIAL_ENTERPRISES);

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
  const [currentTab, setCurrentTab] = useState<'map' | 'directory' | 'about'>('map');
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>(enterprises[0]?.id || 'foreword-coffee');

  // Map engine toggle: default to google maps
  const [useGoogleMaps, setUseGoogleMaps] = useState<boolean>(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCause, setSelectedCause] = useState<BeneficiaryCause | 'all'>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isTrailDrawerOpen, setIsTrailDrawerOpen] = useState<boolean>(false);

  // Sync state to localStorage
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
      item.description.toLowerCase().includes(q);

    return matchCategory && matchCause && matchNeighborhood && matchSearch;
  });

  const selectedEnterprise = enterprises.find((e) => e.id === selectedEnterpriseId) || null;
  const trailEnterprises = trailIds
    .map((id) => enterprises.find((e) => e.id === id))
    .filter((e): e is SocialEnterprise => e !== undefined);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans">
      {/* Prototype notice */}
      <div role="note" className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-1.5 text-[11px] sm:text-xs text-center">
        Prototype with sample data. Addresses, hours and descriptions are unverified; check with each venue.
      </div>

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
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
        {(
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
                    Explore local social enterprises that employ people who are often left out of work, across F&amp;B, wellness, artisan gifts and sports. Bookmark places and string together a weekend trail.
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
                    <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="tabular-nums">{enterprises.length} sample enterprises</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-600">
                      <span>Prototype: details are unverified. Check with each venue.</span>
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
                        onAddToTrail={() => handleToggleTrail(enterprise)}
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
                      onAddToTrail={() => handleToggleTrail(enterprise)}
                    />
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
        onNavigate={(tab) => setCurrentTab(tab)}
      />

      {/* Weekend GaiGai Trail Drawer */}
      <TrailDrawer
        isOpen={isTrailDrawerOpen}
        onClose={() => setIsTrailDrawerOpen(false)}
        trailEnterprises={trailEnterprises}
        onRemoveFromTrail={(id) => setTrailIds(trailIds.filter((tid) => tid !== id))}
        onMoveUp={handleMoveTrailUp}
        onMoveDown={handleMoveTrailDown}
        onClearTrail={handleClearTrail}
      />
    </div>
  );
}
