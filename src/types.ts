export type Category = 'fnb' | 'wellness' | 'gifts' | 'experience';

export type BeneficiaryCause = 
  | 'neurodiversity' 
  | 'disabilities' 
  | 'women_youth' 
  | 'seniors' 
  | 'visual_impairment';

export interface Offering {
  id: string;
  name: string;
  price: string;
  description: string;
  impactTag: string;
}

export interface StoryChapter {
  chapterNumber: number;
  title: string;
  subtitle: string;
  narrative: string;
  quote?: string;
  quoteAuthor?: string;
  metricNumber?: string;
  metricLabel?: string;
  visualTheme: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  text: string;
  sentiment: 'Quality' | 'Inclusivity' | 'Hospitality' | 'Atmosphere';
  ownerResponse?: string;
}

export interface SocialEnterprise {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  cause: BeneficiaryCause;
  causeLabel: string;
  address: string;
  district: string;
  mrt: string;
  mrtLineColor: string;
  // Real-world Singapore geographic coordinates for Google Maps
  lat: number;
  lng: number;
  // Normalized 0-100 coordinates for fallback vector graphics
  mapX: number;
  mapY: number;
  phone: string;
  email: string;
  website: string;
  openingHours: string;
  wheelchairAccessible: boolean;
  verifiedRaiSE: boolean;
  enablingMark?: string; // e.g. "Platinum", "Gold"
  donationGoal: number;
  currentRaised: number;
  impactMetrics: {
    primaryNumber: string;
    primaryLabel: string;
    secondaryNumber: string;
    secondaryLabel: string;
  };
  offerings: Offering[];
  storyChapters: StoryChapter[];
  googleRating: number;
  reviewCount: number;
  googleReviews: GoogleReview[];
}

export interface ItineraryItem {
  enterpriseId: string;
  timeSlot: string;
  notes?: string;
  plannedSpend: number;
}

export interface DonationRecord {
  id: string;
  enterpriseId: string;
  enterpriseName: string;
  donorName: string;
  amount: number;
  message: string;
  timestamp: string;
  paymentMethod: 'paynow' | 'card';
  isMonthly: boolean;
}
