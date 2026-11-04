import raw from './raiseDirectory.json';
import links from '../../data/raise-links.json';
import { BeneficiaryGroup, RaiseEntry, SocialEnterprise } from '../types';
import { RAISE_CODE_TO_GROUP } from './groups';

export const RAISE_FETCHED_ON: string = raw.fetchedOn;
export const RAISE_SCOPE: string = raw.scope;

/** All snapshot records, minus raiSE's own test record. */
export const RAISE_ENTRIES: RaiseEntry[] = (raw.entries as RaiseEntry[]).filter(
  (e) => !/^\(TEST\)/i.test(e.name),
);

const byId = new Map(RAISE_ENTRIES.map((e) => [e.id, e]));

type LinkMap = Record<string, { directoryId: number | null; note: string | null } | string>;

function groupsFor(entry: RaiseEntry): BeneficiaryGroup[] {
  const out = new Set<BeneficiaryGroup>();
  entry.beneficiaryCodes.forEach((c) => {
    const g = RAISE_CODE_TO_GROUP[c];
    if (g) out.add(g);
  });
  return [...out];
}

/**
 * Fills raiSE tier, link and caveat onto the sample enterprises from the
 * directory snapshot. Nothing here is hand-typed: the tier is whatever the
 * snapshot says, and enterprises not found in the directory get no tier.
 */
export function attachRaise(enterprises: SocialEnterprise[]): SocialEnterprise[] {
  const map = links as unknown as LinkMap;
  return enterprises.map((ent) => {
    const link = map[ent.id];
    if (!link || typeof link === 'string') return ent;
    const entry = link.directoryId != null ? byId.get(link.directoryId) : undefined;
    return {
      ...ent,
      groups: entry ? groupsFor(entry) : [],
      raiseTier: entry ? entry.tier : null,
      raiseCheckedOn: entry ? RAISE_FETCHED_ON : null,
      raiseUrl: entry ? entry.url : null,
      raiseNote: link.note,
    };
  });
}

/** Beneficiary groups present in the snapshot, with counts, most common first. */
export function beneficiaryOptions(): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  RAISE_ENTRIES.forEach((e) => e.beneficiaries.forEach((b) => counts.set(b, (counts.get(b) ?? 0) + 1)));
  return [...counts.entries()].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
}
