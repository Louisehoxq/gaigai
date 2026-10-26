import React, { useState } from 'react';
import { SocialEnterprise, DonationRecord, GoogleReview } from '../types';
import { 
  Building, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Save, 
  Check, 
  ShieldCheck, 
  Share2, 
  Plus, 
  Sparkles,
  HeartHandshake,
  Send,
  MessageCircle,
  BarChart3
} from 'lucide-react';

interface EnterpriseDashboardProps {
  enterprises: SocialEnterprise[];
  selectedEnterpriseId: string;
  onSelectEnterprise: (id: string) => void;
  donationRecords: DonationRecord[];
  onUpdateEnterprise: (updated: SocialEnterprise) => void;
  onAddReviewResponse: (enterpriseId: string, reviewId: string, response: string) => void;
}

export const EnterpriseDashboard: React.FC<EnterpriseDashboardProps> = ({
  enterprises,
  selectedEnterpriseId,
  onSelectEnterprise,
  donationRecords,
  onUpdateEnterprise,
  onAddReviewResponse,
}) => {
  const currentEnterprise = enterprises.find((e) => e.id === selectedEnterpriseId) || enterprises[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'reviews'>('overview');

  // Form states for profile editing
  const [tagline, setTagline] = useState(currentEnterprise.tagline);
  const [description, setDescription] = useState(currentEnterprise.description);
  const [openingHours, setOpeningHours] = useState(currentEnterprise.openingHours);
  const [phone, setPhone] = useState(currentEnterprise.phone);
  const [email, setEmail] = useState(currentEnterprise.email);
  const [website, setWebsite] = useState(currentEnterprise.website);
  const [address, setAddress] = useState(currentEnterprise.address);
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Response inputs for Google reviews
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [replySuccess, setReplySuccess] = useState<Record<string, boolean>>({});

  // When enterprise switcher changes, update local form states
  const handleSwitchEnterprise = (id: string) => {
    onSelectEnterprise(id);
    const target = enterprises.find((e) => e.id === id);
    if (target) {
      setTagline(target.tagline);
      setDescription(target.description);
      setOpeningHours(target.openingHours);
      setPhone(target.phone);
      setEmail(target.email);
      setWebsite(target.website);
      setAddress(target.address);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SocialEnterprise = {
      ...currentEnterprise,
      tagline,
      description,
      openingHours,
      phone,
      email,
      website,
      address,
    };
    onUpdateEnterprise(updated);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const handlePostReply = (reviewId: string) => {
    const text = replyTexts[reviewId];
    if (!text || !text.trim()) return;

    onAddReviewResponse(currentEnterprise.id, reviewId, text.trim());
    setReplySuccess((prev) => ({ ...prev, [reviewId]: true }));
    setTimeout(() => {
      setReplySuccess((prev) => ({ ...prev, [reviewId]: false }));
      setReplyTexts((prev) => ({ ...prev, [reviewId]: '' }));
    }, 2000);
  };

  // Enterprise specific donations
  const enterpriseDonations = donationRecords.filter(
    (d) => d.enterpriseId === currentEnterprise.id
  );

  const totalRaised = currentEnterprise.currentRaised;
  const progressPercent = Math.min(
    Math.round((totalRaised / currentEnterprise.donationGoal) * 100),
    100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Enterprise Switcher & Title */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-display font-extrabold text-2xl shrink-0">
            {currentEnterprise.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                {currentEnterprise.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>raiSE Partner Portal</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">
              Impact Mission: <strong className="text-stone-700">{currentEnterprise.causeLabel}</strong> · {currentEnterprise.district}
            </p>
          </div>
        </div>

        {/* Enterprise Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="portal-select" className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0">
            Managing:
          </label>
          <select
            id="portal-select"
            value={currentEnterprise.id}
            onChange={(e) => handleSwitchEnterprise(e.target.value)}
            className="text-xs font-semibold text-stone-800 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
          >
            {enterprises.map((ent) => (
              <option key={ent.id} value={ent.id}>
                {ent.name} ({ent.category.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-rose-600 ${
            activeTab === 'overview'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Donations &amp; Impact Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-rose-600 ${
            activeTab === 'reviews'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Star className="w-4 h-4 text-amber-500" />
          <span>Google Reviews &amp; Feedback ({currentEnterprise.googleReviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-rose-600 ${
            activeTab === 'profile'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Profile &amp; Hours Editor</span>
        </button>
      </div>

      {/* Tab 1: Donation Analytics & Impact Stream */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Total Funds Raised
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ${totalRaised.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {progressPercent}% of Goal
                </span>
              </div>
              <div className="w-full h-2 bg-stone-100 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-rose-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-stone-400 mt-1.5 block">
                Target: ${currentEnterprise.donationGoal.toLocaleString()} SGD
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Community Donors
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {34 + enterpriseDonations.length}
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  Singapreans
                </span>
              </div>
              <span className="text-[11px] text-stone-400 mt-5 block">
                Avg. gift: $45 SGD · 100% direct allocation
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Primary Impact Metric
              </span>
              <div className="mt-2">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {currentEnterprise.impactMetrics.primaryNumber}
                </span>
                <span className="text-xs text-stone-600 font-medium block mt-0.5">
                  {currentEnterprise.impactMetrics.primaryLabel}
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-2 block">
                Verified by Enabling Mark audit
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                Google Satisfaction Score
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ★ {currentEnterprise.googleRating}
                </span>
                <span className="text-xs text-stone-500">
                  ({currentEnterprise.reviewCount} reviews)
                </span>
              </div>
              <span className="text-[11px] text-stone-400 mt-5 block">
                Google Places &amp; Maps API Connected
              </span>
            </div>
          </div>

          {/* Live Donation Feed & Donor Notes */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-rose-600" />
                  <span>Real-Time Donation &amp; Donor Messages Stream</span>
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  Live contributions received through PayNow and Card on GaiGai
                </p>
              </div>

              <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                Live Feed
              </span>
            </div>

            {enterpriseDonations.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center italic">
                No recent donations in this current session. Use the "Support" button on the explorer to simulate a new donation!
              </p>
            ) : (
              <div className="divide-y divide-stone-100">
                {enterpriseDonations.map((don) => (
                  <div key={don.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900">{don.donorName}</span>
                        <span className="text-stone-300">·</span>
                        <span className="text-stone-500 font-mono text-[11px]">{don.timestamp}</span>
                        <span className="text-stone-300">·</span>
                        <span className="text-[10px] font-semibold text-purple-800 bg-purple-50 px-1.5 py-0.2 rounded uppercase">
                          {don.paymentMethod}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 italic">
                        "{don.message}"
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-emerald-700 tabular-nums">
                        +${don.amount} SGD
                      </span>
                      {don.isMonthly && (
                        <span className="block text-[10px] font-semibold text-rose-600">
                          Monthly Sustainer
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Google Reviews Integration & Sentiment Stream */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Reviews Scorecard */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Google Customer Sentiment &amp; Rating
              </span>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                  {currentEnterprise.googleRating}
                </span>
                <div>
                  <div className="flex items-center text-amber-400">
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-xs text-stone-500">
                    Based on {currentEnterprise.reviewCount} verified Google Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center min-w-24">
                <span className="text-xs font-semibold text-stone-500 block">Quality</span>
                <span className="text-sm font-bold text-emerald-700">98% Positive</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center min-w-24">
                <span className="text-xs font-semibold text-stone-500 block">Inclusivity</span>
                <span className="text-sm font-bold text-rose-700">100% Praised</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center min-w-24">
                <span className="text-xs font-semibold text-stone-500 block">Hospitality</span>
                <span className="text-sm font-bold text-amber-700">96% Warm</span>
              </div>
            </div>
          </div>

          {/* Reviews Stream with Owner Reply Simulator */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Customer Reviews Feed &amp; Direct Reply
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Respond to customers directly from this portal to foster long-term loyalty and visibility.
              </p>
            </div>

            <div className="space-y-5">
              {currentEnterprise.googleReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                        <span className="text-xs text-stone-400">· {rev.relativeTime}</span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs mt-0.5">
                        {'★'.repeat(rev.rating)}
                        <span className="text-stone-300">{'★'.repeat(5 - rev.rating)}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded">
                      Category: {rev.sentiment}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    "{rev.text}"
                  </p>

                  {/* Owner Response if already present */}
                  {rev.ownerResponse && (
                    <div className="p-3 bg-rose-50/60 border border-rose-200/60 rounded-xl text-xs space-y-1">
                      <span className="font-bold text-rose-900 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-rose-600" />
                        <span>Response from {currentEnterprise.name}</span>
                      </span>
                      <p className="text-stone-700 italic">
                        "{rev.ownerResponse}"
                      </p>
                    </div>
                  )}

                  {/* Reply Form if not replied or reply simulator */}
                  <div className="pt-2 border-t border-stone-200/60 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type official owner reply to this review..."
                      value={replyTexts[rev.id] || ''}
                      onChange={(e) => setReplyTexts((prev) => ({ ...prev, [rev.id]: e.target.value }))}
                      className="flex-1 text-xs font-medium text-stone-900 bg-white border border-stone-300 rounded-lg px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                    />
                    <button
                      onClick={() => handlePostReply(rev.id)}
                      className="py-1.5 px-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                    >
                      {replySuccess[rev.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Replied!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Post Reply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Profile & Offerings Editor */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Profile &amp; Contact Details
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Keep your business information, operating hours, and location up to date for GaiGai explorers.
                </p>
              </div>

              <button
                type="submit"
                className="py-2 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                {isSavedToast ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Saved Successfully!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Tagline / Catchphrase:
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Operating Hours:
                </label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Full Physical Address:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Mission &amp; About Description:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Contact Phone:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Contact Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Offerings Preview */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-3">
                Active Offerings &amp; Experiences Catalog:
              </span>
              <div className="space-y-2">
                {currentEnterprise.offerings.map((offering) => (
                  <div key={offering.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{offering.name}</span>
                      <p className="text-[11px] text-stone-500">{offering.description}</p>
                    </div>
                    <span className="font-extrabold text-stone-800 tabular-nums ml-4 shrink-0">
                      {offering.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
