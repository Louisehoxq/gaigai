import { describe, expect, it } from 'vitest';
import { SOCIAL_ENTERPRISES } from '../src/data/socialEnterprises';
import { RAISE_ENTRIES, attachRaise, beneficiaryOptions } from '../src/data/raise';
import { GROUP_KEYS, matchesGroup } from '../src/data/groups';
import { trackedUrl } from '../src/lib/track';
import links from '../data/raise-links.json';

describe('sample enterprises', () => {
  it('have unique ids and Singapore coordinates', () => {
    const ids = SOCIAL_ENTERPRISES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of SOCIAL_ENTERPRISES) {
      expect(e.lat, e.id).toBeGreaterThan(1.1);
      expect(e.lat, e.id).toBeLessThan(1.5);
      expect(e.lng, e.id).toBeGreaterThan(103.55);
      expect(e.lng, e.id).toBeLessThan(104.1);
      expect(() => new URL(e.website), e.id).not.toThrow();
    }
  });
  it('carry no hard-coded raiSE tier (it must come from the snapshot)', () => {
    for (const e of SOCIAL_ENTERPRISES) {
      expect(e.raiseTier, e.id).toBeNull();
      expect(e.groups, e.id).toEqual([]);
    }
  });
  it('all appear in data/raise-links.json with a reason when not listed', () => {
    const map = links as unknown as Record<string, { directoryId: number | null; note: string | null }>;
    for (const e of SOCIAL_ENTERPRISES) {
      expect(map[e.id], `${e.id} missing from raise-links.json`).toBeDefined();
      if (map[e.id].directoryId === null) expect(map[e.id].note, e.id).toBeTruthy();
    }
  });
});

describe('raiSE snapshot', () => {
  it('matches the numbers reported in the research', () => {
    expect(RAISE_ENTRIES.length).toBe(358); // 359 records minus raiSE's own "(TEST)" record
    const tiers = RAISE_ENTRIES.reduce<Record<string, number>>((a, e) => ((a[e.tier] = (a[e.tier] ?? 0) + 1), a), {});
    expect(tiers).toEqual({ Emerging: 226, Leading: 115, 'Verified Leading': 17 });
    const fnbRetailInclusive = RAISE_ENTRIES.filter(
      (e) => (e.industry === 'Food & Beverage' || e.industry === 'Fashion & Retail') && e.impact.includes('Inclusive employment'),
    );
    expect(fnbRetailInclusive.length).toBe(56);
  });
  it('has no leftover HTML entities in names and valid record URLs', () => {
    for (const e of RAISE_ENTRIES) {
      expect(e.name).not.toMatch(/&#\d+;|&amp;/);
      expect(e.url).toMatch(/^https:\/\/www\.raise\.sg\/directory\//);
    }
  });
  it('lists beneficiary groups', () => {
    expect(beneficiaryOptions().length).toBeGreaterThan(5);
  });
});

describe('attachRaise', () => {
  const withRaise = attachRaise(SOCIAL_ENTERPRISES);
  const get = (id: string) => withRaise.find((e) => e.id === id)!;
  it('fills tiers from the snapshot, not from memory', () => {
    expect(get('teddythotz').raiseTier).toBe('Emerging');
    expect(get('foreword-coffee').raiseTier).toBe('Verified Leading');
    expect(get('dignity-kitchen').raiseTier).toBe('Leading');
  });
  it('gives no tier to enterprises not in the directory', () => {
    for (const id of ['prof-brawn', 'hush-teabar', 'savh-massage', 'the-art-faculty', 'runninghour']) {
      expect(get(id).raiseTier, id).toBeNull();
      expect(get(id).raiseNote, id).toBeTruthy();
    }
  });
});

describe('groups and links', () => {
  it('matchesGroup uses raiSE tags and self-described groups', () => {
    const t = attachRaise(SOCIAL_ENTERPRISES).find((e) => e.id === 'teddythotz')!;
    expect(matchesGroup(t, 'single_parents')).toBe(true); // raiSE tag
    expect(matchesGroup(t, 'older_workers')).toBe(true); // self-described
    expect(matchesGroup(t, 'ex_offenders')).toBe(false);
    expect(matchesGroup(t, 'all')).toBe(true);
    expect(GROUP_KEYS.length).toBe(8);
  });
  it('trackedUrl adds campaign tags and keeps existing params', () => {
    const e = { ...SOCIAL_ENTERPRISES[0], website: 'https://example.com/shop?a=1' };
    const u = new URL(trackedUrl(e, 'card'));
    expect(u.searchParams.get('a')).toBe('1');
    expect(u.searchParams.get('utm_source')).toBe('gaigai');
    expect(u.searchParams.get('utm_medium')).toBe('card');
  });
});
