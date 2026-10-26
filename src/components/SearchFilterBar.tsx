import React, { useState, useRef } from 'react';
import { Category, BeneficiaryCause } from '../types';
import { 
  Search, 
  Mic, 
  MicOff, 
  Sparkles, 
  X, 
  MapPin, 
  Heart, 
  Coffee, 
  Gift, 
  Activity, 
  Filter,
  Loader2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface GroundingChunk {
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        reviewText?: string;
      }>;
    };
  };
  web?: {
    uri?: string;
    title?: string;
  };
}

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (n: string) => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (c: Category | 'all') => void;
  selectedCause: BeneficiaryCause | 'all';
  setSelectedCause: (cause: BeneficiaryCause | 'all') => void;
  onSearchSubmit: () => void;
  onResetFilters: () => void;
}

export const NEIGHBORHOODS = [
  { id: 'all', label: 'All Singapore' },
  { id: 'Central', label: 'Orchard & Central' },
  { id: 'Chinatown', label: 'Chinatown / Kreta Ayer' },
  { id: 'Ang Mo Kio', label: 'Ang Mo Kio' },
  { id: 'Bedok', label: 'Bedok & Chai Chee' },
  { id: 'Toa Payoh', label: 'Toa Payoh' },
  { id: 'Boon Keng', label: 'Boon Keng' },
  { id: 'Redhill', label: 'Redhill & Enabling Village' },
  { id: 'Bishan', label: 'Bishan & Marina Bay' },
];

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedNeighborhood,
  setSelectedNeighborhood,
  selectedCategory,
  setSelectedCategory,
  selectedCause,
  setSelectedCause,
  onSearchSubmit,
  onResetFilters,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);

  // Maps Grounding AI modal state
  const [isGroundingOpen, setIsGroundingOpen] = useState(false);
  const [groundingQuery, setGroundingQuery] = useState('');
  const [isGroundingLoading, setIsGroundingLoading] = useState(false);
  const [groundingResult, setGroundingResult] = useState<{
    text: string;
    chunks: GroundingChunk[];
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio Recording & Transcription using gemini-3.5-transcribe
  const startRecording = async () => {
    try {
      setTranscriptionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Stop audio tracks
        stream.getTracks().forEach((track) => track.stop());

        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          if (!base64Data) return;

          setIsTranscribing(true);
          try {
            const res = await fetch('/api/gemini/transcribe-audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioData: base64Data,
                mimeType: 'audio/webm',
              }),
            });

            if (!res.ok) {
              throw new Error(`Transcription failed with status ${res.status}`);
            }

            const data = await res.json();
            if (data.transcription) {
              setSearchQuery(data.transcription);
              onSearchSubmit();
            }
          } catch (err: unknown) {
            console.error('Audio transcribe error:', err);
            setTranscriptionError('Could not transcribe audio. Please type query.');
          } finally {
            setIsTranscribing(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: unknown) {
      console.error('Microphone access denied:', err);
      setTranscriptionError('Microphone permission required for voice search.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Google Maps Grounding using gemini-3.8-flash with googleMaps tool
  const handleMapsGroundingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = groundingQuery || searchQuery || 'inclusive cafes in Singapore';
    setIsGroundingLoading(true);
    setGroundingResult(null);

    try {
      const res = await fetch('/api/gemini/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          userLocation: { latitude: 1.3521, longitude: 103.8198 },
        }),
      });

      if (!res.ok) throw new Error('Maps grounding request failed');
      const data = await res.json();
      setGroundingResult({
        text: data.text,
        chunks: data.groundingChunks || [],
      });
    } catch (err) {
      console.error('Maps grounding error:', err);
    } finally {
      setIsGroundingLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const hasActiveFilters = 
    Boolean(searchQuery) || 
    selectedNeighborhood !== 'all' || 
    selectedCategory !== 'all' || 
    selectedCause !== 'all';

  return (
    <div className="w-full space-y-4">
      {/* Primary Search Bar with Search Button & Voice Search */}
      <form onSubmit={handleFormSubmit} className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" aria-hidden="true" />
          
          <input
            type="search"
            placeholder="Search by neighborhood (Orchard, AMK, Bedok), keyword (coffee, massage, crafts), or cause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-3 text-xs sm:text-sm font-medium text-stone-900 bg-white border border-stone-300 rounded-xl shadow-sm focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
            aria-label="Search by neighborhood, keyword, or cause"
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSearchSubmit();
              }}
              className="absolute right-12 top-3 text-stone-400 hover:text-stone-700 p-1"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Audio Microphone Button (Gemini-3.5-transcribe) */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isTranscribing}
            className={`absolute right-2 top-2 p-1.5 rounded-lg transition-colors flex items-center justify-center ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            aria-label={isRecording ? 'Stop recording voice search' : 'Search with voice input'}
            title="Search with voice input (Transcribed by Gemini)"
          >
            {isTranscribing ? (
              <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
            ) : isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Primary Search Button */}
        <button
          type="submit"
          className="py-3 px-6 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-rose-600 cursor-pointer"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          <span>Search</span>
        </button>

        {/* AI Maps Grounding Assistant Button */}
        <button
          type="button"
          onClick={() => {
            setIsGroundingOpen(true);
            setGroundingQuery(searchQuery || 'inclusive cafes in Singapore');
          }}
          className="py-3 px-4 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-rose-600 cursor-pointer"
          title="Ask Google Maps Grounding AI (Gemini 3.8 Flash)"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="hidden md:inline">Google Maps AI</span>
          <span className="md:hidden">Maps AI</span>
        </button>
      </form>

      {/* Voice Status or Error */}
      {isRecording && (
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          <span>Listening... speak your neighborhood or keyword (e.g. "coffee in Dhoby Ghaut", "blind massage in Toa Payoh"). Click mic to finish.</span>
        </div>
      )}

      {isTranscribing && (
        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-100 p-2 rounded-lg">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
          <span>Transcribing voice query with Gemini audio model...</span>
        </div>
      )}

      {transcriptionError && (
        <div className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
          {transcriptionError}
        </div>
      )}

      {/* Multi-Facet Filter Bar: Neighborhoods, Causes, Categories */}
      <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
        {/* Neighborhood Quick Filter Chips */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Filter by Neighborhood:</span>
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-rose-600 hover:text-rose-700 normal-case font-bold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {NEIGHBORHOODS.map((nh) => (
              <button
                type="button"
                key={nh.id}
                onClick={() => {
                  setSelectedNeighborhood(nh.id);
                  onSearchSubmit();
                }}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-rose-600 ${
                  selectedNeighborhood === nh.id
                    ? 'bg-rose-600 text-white shadow-sm font-semibold'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {nh.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Row: Cause and Category Dropdowns */}
        <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Cause Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="cause-filter-select" className="font-semibold text-stone-500 uppercase tracking-wider shrink-0">
              Cause:
            </label>
            <select
              id="cause-filter-select"
              value={selectedCause}
              onChange={(e) => {
                setSelectedCause(e.target.value as BeneficiaryCause | 'all');
                onSearchSubmit();
              }}
              className="flex-1 text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
            >
              <option value="all">All Beneficiary Causes</option>
              <option value="neurodiversity">Neurodiversity &amp; Autism</option>
              <option value="disabilities">Physical &amp; Intellectual Disabilities</option>
              <option value="women_youth">Marginalized Women &amp; Youth</option>
              <option value="seniors">Elderly Crafters &amp; Artisans</option>
              <option value="visual_impairment">Visually Impaired Community</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter-select" className="font-semibold text-stone-500 uppercase tracking-wider shrink-0">
              Type:
            </label>
            <select
              id="category-filter-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as Category | 'all');
                onSearchSubmit();
              }}
              className="flex-1 text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
            >
              <option value="all">All Goods &amp; Services</option>
              <option value="fnb">F&amp;B / Specialty Cafes &amp; Food</option>
              <option value="wellness">Wellness, Massage &amp; Silent Tea</option>
              <option value="gifts">Handmade Gifts, Batik &amp; Art</option>
              <option value="experience">Social Movement &amp; Inclusive Sports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Google Maps Grounding Modal Drawer */}
      {isGroundingOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Google Maps AI Grounding Assistant"
        >
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Google Maps AI Grounding Assistant
                  </h3>
                  <p className="text-xs text-stone-500">
                    Powered by Gemini 3.8 Flash with live Google Maps grounding
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGroundingOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input & Search */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <form onSubmit={handleMapsGroundingSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Find quiet cafes with disability hiring near Orchard..."
                  value={groundingQuery}
                  onChange={(e) => setGroundingQuery(e.target.value)}
                  className="flex-1 p-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isGroundingLoading}
                  className="py-2.5 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {isGroundingLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Ask Maps AI</span>
                </button>
              </form>

              {/* Grounded Results Output */}
              {isGroundingLoading && (
                <div className="py-10 text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-rose-600 mx-auto" />
                  <p className="text-xs text-stone-500">
                    Retrieving verified place details from Google Maps Platform...
                  </p>
                </div>
              )}

              {groundingResult && (
                <div className="space-y-4 text-xs sm:text-sm text-stone-800 leading-relaxed">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 whitespace-pre-wrap">
                    {groundingResult.text}
                  </div>

                  {/* Extract URLs and display as clickable links as mandated by Maps Grounding guidelines */}
                  {groundingResult.chunks.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-stone-200">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                        Verified Google Maps Places:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {groundingResult.chunks.map((chunk, idx) => {
                          if (chunk.maps?.uri) {
                            return (
                              <a
                                key={idx}
                                href={chunk.maps.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-sky-50/70 hover:bg-sky-100/80 border border-sky-200 rounded-xl flex items-center justify-between text-xs text-sky-900 font-medium transition-colors"
                              >
                                <span className="truncate pr-2">{chunk.maps.title || 'View on Google Maps'}</span>
                                <ExternalLink className="w-3.5 h-3.5 shrink-0 text-sky-600" />
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
