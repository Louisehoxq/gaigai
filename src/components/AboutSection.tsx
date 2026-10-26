import React from 'react';
import { PeranakanDivider } from './PeranakanDivider';
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Coffee, 
  Gift, 
  Activity, 
  MapPin,
  Award,
  ExternalLink
} from 'lucide-react';

interface AboutSectionProps {
  onExploreMap: () => void;
  onOpenTrail: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreMap,
  onOpenTrail,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-stone-800">
      {/* Hero Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200/80 rounded-full text-xs font-semibold text-rose-700">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>The GaiGai Story</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Where Every Step and Dollar in Singapore Counts
        </h2>

        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          In Singapore, <em>"GaiGai"</em> means to go out for a leisurely walk, window shopping, or a weekend outing with friends and family. GaiGai transforms everyday leisure into dignified livelihoods for local disadvantaged communities.
        </p>
      </div>

      <PeranakanDivider variant="ornate" />

      {/* The Two-Fold Intent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            For Purposeful Seekers &amp; Weekend Explorers
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Whether you want a great cup of specialty flat white, a rejuvenating acupressure massage, unique handcrafted gifts, or an inclusive outdoor run, you have the agency to choose quality goods and services that directly empower persons with disabilities, single mothers, and seniors.
          </p>
          <button
            onClick={onExploreMap}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 pt-1"
          >
            <span>Explore Map of Social Enterprises</span>
            <span>→</span>
          </button>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            For Social Entrepreneurs &amp; Impact Leaders
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Social enterprises face high overheads and need sustainable, repeating revenue streams. GaiGai gives them islandwide visibility, a direct channel to receive verified PayNow donations, and real-time Google Reviews integration to monitor customer sentiment and scale impact.
          </p>
          <div className="text-xs font-bold text-emerald-800 pt-1 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Integrated with raiSE Social Impact Framework</span>
          </div>
        </div>
      </div>

      {/* The 4 GaiGai Experience Pillars */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 text-center">
          Four Ways to Spend Meaningfully in Singapore
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Coffee className="w-4 h-4" />
              <span>Food &amp; Beverage</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cafes like <strong>Foreword Coffee</strong>, <strong>Bettr Group</strong>, and <strong>Professor Brawn</strong> roast single-origin beans and serve comfort food while providing structured employment for neurodivergent youth and marginalized women.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <Heart className="w-4 h-4" />
              <span>Wellness &amp; Care</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Therapies by the <strong>SAVH Mobile Massage Team</strong> and silent tea ceremonies by <strong>Hush TeaBar</strong> provide world-class relaxation performed by visually impaired and Deaf masters.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <Gift className="w-4 h-4" />
              <span>Artisan Gifts &amp; Heritage</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Discover handmade amigurumi plushies by senior crafters at <strong>TeddyThotz</strong> or designer accessories featuring artwork by autistic artists at <strong>The Art Faculty</strong> where artists earn direct royalties.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <Activity className="w-4 h-4" />
              <span>Social Experience &amp; Sports</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Join <strong>Runninghour</strong> for Saturday morning community runs and tandem bike rides in Bishan Park, forging real cross-ability friendships in the fresh morning air.
            </p>
          </div>
        </div>
      </div>

      {/* Community Call to Action */}
      <div className="p-8 bg-stone-900 text-white rounded-3xl text-center space-y-4">
        <Sparkles className="w-8 h-8 text-rose-400 mx-auto" />
        <h3 className="text-2xl font-bold tracking-tight">
          Ready for your next weekend GaiGai adventure?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
          Open the interactive map, bookmark your favorite places, and calculate your weekend social return.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={onExploreMap}
            className="py-2.5 px-5 text-xs font-bold text-slate-900 bg-white hover:bg-stone-100 rounded-xl transition-colors shadow-sm"
          >
            Open Interactive Map
          </button>
          <button
            onClick={onOpenTrail}
            className="py-2.5 px-5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm"
          >
            View Weekend Trail Planner
          </button>
        </div>
      </div>
    </div>
  );
};
