import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Heart, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'map' | 'directory' | 'stories' | 'about') => void;
  onOpenEnterprise: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnterprise }) => {
  return (
    <footer className="bg-white border-t border-stone-200 mt-20 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Ethos */}
          <div className="md:col-span-2 space-y-3">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              GaiGai is a Singapore civic platform celebrating local social enterprises. We empower conscious consumers to spend meaningfully across F&amp;B, wellness, gifts, and experiences while providing social businesses with visibility, verified PayNow donations, and real-time Google Reviews analytics.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Aligned with raiSE (Singapore Centre for Social Enterprise) Standards</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Explore Singapore
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('map')} 
                  className="hover:text-rose-600 transition-colors"
                >
                  Interactive Singapore Map
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('directory')} 
                  className="hover:text-rose-600 transition-colors"
                >
                  Social Enterprise Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('stories')} 
                  className="hover:text-rose-600 transition-colors"
                >
                  Animated Impact Stories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-rose-600 transition-colors"
                >
                  About the Movement
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Enterprises & Accessibility */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              For Social Enterprises
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={onOpenEnterprise} 
                  className="font-semibold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Enterprise Partner Portal →
                </button>
              </li>
              <li className="text-stone-400">
                Live Donation Stream &amp; Trends
              </li>
              <li className="text-stone-400">
                Google Reviews &amp; Feedback Hub
              </li>
              <li className="text-[11px] text-stone-400 pt-2">
                Built to axe-core &amp; WCAG 2.1 AA Accessibility Standards.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} GaiGai Singapore. Made with heart for our community.</p>
          <p className="flex items-center gap-1">
            <span>Passionate about purposeful spending in Singapore</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
