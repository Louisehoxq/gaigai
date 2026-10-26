import React, { useState, useEffect } from 'react';
import { SocialEnterprise, StoryChapter } from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Quote, 
  HeartHandshake, 
  BookmarkPlus, 
  Eye, 
  BookOpen 
} from 'lucide-react';

interface StoryModalProps {
  enterprise: SocialEnterprise;
  onClose: () => void;
  onAddToTrail: (enterprise: SocialEnterprise) => void;
  isInTrail: boolean;
  onOpenDonation: (enterprise: SocialEnterprise) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  enterprise,
  onClose,
  onAddToTrail,
  isInTrail,
  onOpenDonation,
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const chapters = enterprise.storyChapters;
  const currentChapter: StoryChapter = chapters[currentChapterIndex] || chapters[0];

  // Auto-advance chapters if playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentChapterIndex < chapters.length - 1) {
        setCurrentChapterIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentChapterIndex, chapters.length]);

  // Keyboard controls (Arrow keys & Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setCurrentChapterIndex((prev) => Math.min(prev + 1, chapters.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentChapterIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, chapters.length]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label={`Impact story for ${enterprise.name}`}
    >
      <div className="relative w-full max-w-3xl bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-stone-700/60 flex flex-col max-h-[92vh]">
        {/* Story Top Progress Header */}
        <div className="p-4 sm:p-6 pb-3 border-b border-stone-800">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                Impact Chronicles · {enterprise.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Transcript Toggle for Accessibility */}
              <button
                onClick={() => setShowFullTranscript(!showFullTranscript)}
                className="p-1.5 text-xs text-stone-400 hover:text-white rounded-lg bg-stone-800/80 hover:bg-stone-800 transition-colors flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label="Toggle text transcript mode"
                title="Accessible text transcript"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Transcript</span>
              </button>

              {/* Sound Ambience Simulation Toggle */}
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800/80 hover:bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label={isAudioMuted ? "Unmute audio narration" : "Mute audio narration"}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800/80 hover:bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label={isPlaying ? "Pause story auto-advance" : "Resume story auto-advance"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg bg-stone-800/80 hover:bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                aria-label="Close impact story"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Segmented Timeline Progress Bars */}
          <div className="flex items-center gap-1.5">
            {chapters.map((chap, idx) => (
              <div 
                key={chap.chapterNumber}
                onClick={() => setCurrentChapterIndex(idx)}
                className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden cursor-pointer"
                title={`Chapter ${chap.chapterNumber}: ${chap.title}`}
              >
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    idx < currentChapterIndex 
                      ? 'w-full bg-rose-500' 
                      : idx === currentChapterIndex 
                      ? isPlaying ? 'w-full bg-rose-500 animate-[pulse_2s_ease-in-out_infinite]' : 'w-full bg-rose-500'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Story Body Viewport */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {showFullTranscript ? (
            /* Accessibility Transcript View */
            <div className="space-y-6 text-stone-300">
              <h3 className="text-xl font-bold text-white mb-2">
                Complete Story Transcript: {enterprise.name}
              </h3>
              {chapters.map((chap) => (
                <div key={chap.chapterNumber} className="border-b border-stone-800 pb-4">
                  <h4 className="text-base font-semibold text-rose-400">
                    Chapter {chap.chapterNumber}: {chap.title}
                  </h4>
                  <p className="text-xs text-stone-400 mb-2">{chap.subtitle}</p>
                  <p className="text-sm leading-relaxed mb-3">{chap.narrative}</p>
                  {chap.quote && (
                    <blockquote className="p-3 bg-stone-800/60 rounded-lg text-xs italic text-stone-300">
                      "{chap.quote}" — {chap.quoteAuthor}
                    </blockquote>
                  )}
                  {chap.metricNumber && (
                    <p className="text-xs text-emerald-400 font-semibold mt-2">
                      Key Milestone: {chap.metricNumber} {chap.metricLabel}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Animated Visual Slide View */
            <div className="flex flex-col h-full justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 tracking-wider uppercase mb-1">
                  <span>Chapter {currentChapter.chapterNumber} of {chapters.length}</span>
                  <span>·</span>
                  <span>{currentChapter.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {currentChapter.title}
                </h3>

                <p className="text-base sm:text-lg text-stone-300 leading-relaxed mt-4 font-normal">
                  {currentChapter.narrative}
                </p>
              </div>

              {/* Impact Metric & Testimonial Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {currentChapter.quote && (
                  <div className="p-4 bg-stone-800/70 border border-stone-700/60 rounded-2xl flex flex-col justify-between">
                    <Quote className="w-5 h-5 text-rose-400/80 mb-2 shrink-0" aria-hidden="true" />
                    <p className="text-xs sm:text-sm italic text-stone-200 leading-normal mb-2">
                      "{currentChapter.quote}"
                    </p>
                    <span className="text-xs font-semibold text-rose-300">
                      — {currentChapter.quoteAuthor}
                    </span>
                  </div>
                )}

                {currentChapter.metricNumber && (
                  <div className="p-4 bg-gradient-to-br from-stone-800/90 to-stone-800/50 border border-stone-700/60 rounded-2xl flex flex-col justify-center">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-1">
                      Verified Outcome
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">
                      {currentChapter.metricNumber}
                    </span>
                    <span className="text-xs text-stone-400 mt-1">
                      {currentChapter.metricLabel}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Story Navigation Controls Footer */}
        <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          {/* Chapter Step Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentChapterIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentChapterIndex === 0}
              className="p-2 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-stone-400">
              {currentChapterIndex + 1} / {chapters.length}
            </span>
            <button
              onClick={() => setCurrentChapterIndex((prev) => Math.min(prev + 1, chapters.length - 1))}
              disabled={currentChapterIndex === chapters.length - 1}
              className="p-2 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              aria-label="Next chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Action CTAs: Add to Trail & Support */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onAddToTrail(enterprise)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-rose-500 ${
                isInTrail
                  ? 'bg-stone-800 text-stone-200 border border-stone-700'
                  : 'bg-stone-800 hover:bg-stone-700 text-white'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-rose-400" />
              <span>{isInTrail ? 'Saved in Trail' : 'Add to Trail'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenDonation(enterprise);
              }}
              className="py-2 px-4 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Direct Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
