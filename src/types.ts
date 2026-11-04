export type Category = 'fnb' | 'wellness' | 'gifts' | 'experience';

export type BeneficiaryGroup =
  | 'disabilities'
  | 'mental_health'
  | 'ex_offenders'
  | 'single_parents'
  | 'youth_at_risk'
  | 'low_income'
  | 'unemployed'
  | 'older_workers';

export interface SocialEnterprise {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  /** Short free-text description of who is supported (unverified for sample data). */
  causeLabel: string;
  /** Groups tagged by raiSE for this enterprise. Filled from the directory snapshot; empty if not a raiSE member. */
  groups: BeneficiaryGroup[];
  /** Groups the enterprise describes itself as supporting. Unverified; shown separately from raiSE tags. */
  selfDescribedGroups: BeneficiaryGroup[];
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
  website: string;
  openingHours: string;
  wheelchairAccessible: boolean;
  /**
   * Tier as listed in the raiSE directory (e.g. "Verified Leading", "Leading",
   * "Emerging", "Impact Community"). null = not yet checked against the directory.
   * Never hard-code this: it must come from the directory snapshot.
   */
  raiseTier: string | null;
  /** ISO date (YYYY-MM-DD) the raiSE directory was last checked for this record. */
  raiseCheckedOn: string | null;
  /** Link to this enterprise's raiSE directory record, when it has one. */
  raiseUrl?: string | null;
  /** Plain-language caveat about the raiSE listing (mis-tags, not listed, etc.). */
  raiseNote?: string | null;
}

/** One record of the raiSE membership directory snapshot (src/data/raiseDirectory.json). */
export interface RaiseEntry {
  id: number;
  name: string;
  tierCode: number;
  tier: string;
  industryCode: number | null;
  industry: string | null;
  impact: string[];
  beneficiaryCodes: number[];
  beneficiaries: string[];
  url: string;
}

export interface ItineraryItem {
  enterpriseId: string;
  timeSlot: string;
  notes?: string;
  plannedSpend: number;
}
