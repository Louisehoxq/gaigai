import React, { useState } from 'react';
import { SocialEnterprise } from '../types';
import { track, trackedUrl } from '../lib/track';
import { 
  X, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Navigation, 
  Share2, 
  Printer, 
  Check, 
  Clock, 
  Sparkles, 
  DollarSign, 
  Heart,
  ExternalLink,
  MapPin
} from 'lucide-react';

interface TrailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trailEnterprises: SocialEnterprise[];
  onRemoveFromTrail: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onClearTrail: () => void;
}

export const TrailDrawer: React.FC<TrailDrawerProps> = ({
  isOpen,
  onClose,
  trailEnterprises,
  onRemoveFromTrail,
  onMoveUp,
  onMoveDown,
  onClearTrail,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Estimated default timeslots for a classic Singapore weekend outing
  const timeSlots = [
    '10:00 AM · Morning Specialty Coffee',
    '12:30 PM · Meaningful Lunch & Refreshments',
    '3:00 PM · Artisan Gifts & Heritage Crafts',
    '5:30 PM · Therapeutic Wellness / Relaxation',
    '7:30 PM · Dinner & Community Connections'
  ];

  const handleShareTrail = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintTrail = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Weekend GaiGai Trail Planner"
    >
      <div className="w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                Weekend GaiGai Trail
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {trailEnterprises.length} {trailEnterprises.length === 1 ? 'place' : 'places'} selected for purposeful spending
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-600"
            aria-label="Close Weekend Trail Planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trail summary: facts only, no estimated impact figures */}
        {trailEnterprises.length > 0 && (
          <div className="p-4 mx-4 mt-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-700">
            <span className="font-semibold">
              {trailEnterprises.length} {trailEnterprises.length === 1 ? 'stop' : 'stops'}
            </span>
            <span className="text-stone-500"> · about {trailEnterprises.length * 1.5} hrs</span>
            <p className="mt-1 text-[11px] text-stone-500">
              Opening hours are sample data. Check each venue before you go.
            </p>
          </div>
        )}

        {/* Stops List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {trailEnterprises.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                <Navigation className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                Your GaiGai Trail is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4 leading-relaxed">
                Browse our interactive map or directory and click <strong>"Add to Trail"</strong> to string together an unforgettable, purposeful weekend outing.
              </p>
              <button
                onClick={onClose}
                className="py-2 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
              >
                Start Exploring Places
              </button>
            </div>
          ) : (
            trailEnterprises.map((item, index) => (
              <div 
                key={item.id}
                className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col gap-2"
              >
                {/* Step Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px] font-extrabold">
                      {index + 1}
                    </span>
                    <span>{timeSlots[index] || `Stop ${index + 1}`}</span>
                  </span>

                  {/* Reorder & Delete controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onMoveUp(index)}
                      disabled={index === 0}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 rounded"
                      aria-label="Move stop earlier"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onMoveDown(index)}
                      disabled={index === trailEnterprises.length - 1}
                      className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-20 rounded"
                      aria-label="Move stop later"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromTrail(item.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded"
                      aria-label={`Remove ${item.name} from trail`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5 truncate">
                    <Navigation className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate">{item.mrt}</span>
                  </p>
                </div>

                {/* Suggested Action & Buttons */}
                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-emerald-800">
                    {item.causeLabel}
                  </span>
                  <a
                    href={trackedUrl(item, 'trail')}
                    onClick={() => track('outbound_click', item.id, { medium: 'trail' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Website
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {trailEnterprises.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareTrail}
                className="flex-1 py-2 px-3 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-stone-500" />
                    <span>Share Trail</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrintTrail}
                className="py-2 px-3 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-600"
                aria-label="Print or Save Itinerary"
              >
                <Printer className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={onClearTrail}
                className="py-2 px-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                aria-label="Clear all spots in trail"
              >
                Clear
              </button>
            </div>

            <p className="text-[11px] text-center text-stone-400">
              Plan your MRT trip via TransitLink · Support local social causes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
