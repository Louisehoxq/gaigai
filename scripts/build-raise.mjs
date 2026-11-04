#!/usr/bin/env node
// Builds src/data/raiseDirectory.json from data/raise-directory.tsv.
// Usage: node scripts/build-raise.mjs [--fetched-on YYYY-MM-DD]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argDate = process.argv.indexOf('--fetched-on');
const metaPath = join(root, 'data', 'raise-directory.meta.json');
const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
const fetchedOn = argDate > -1 ? process.argv[argDate + 1] : meta.fetchedOn;

// Term ids from raiSE's WordPress taxonomies (verified against the live API).
const TIERS = {
  193: 'Verified Leading',
  196: 'Verified',
  106: 'Leading',
  107: 'Emerging',
  108: 'Impact Community',
  194: 'ACE Impact Community',
};
const INDUSTRY = {
  186: 'Food & Beverage', 184: 'Fashion & Retail', 198: 'Others', 197: 'Agriculture',
  192: 'Tourism & Hospitality', 191: 'Professional Services', 190: 'Logistics & Transportation',
  189: 'Information & Communications', 188: 'Household Services', 187: 'Health & Social Services',
  177: 'Arts, Sports & Recreation', 185: 'Finance & Insurance', 183: 'Energy, Water & Waste Management',
  182: 'Education & Training', 181: 'Creative, Media & Publication',
  180: 'Construction & Real Estate', 179: 'Business Support Activities', 178: 'Beauty & Wellness',
};
const IMPACT = {
  120: 'Inclusive employment',
  118: 'Inclusive products and services',
  119: 'Capacity building for social organisations',
};
const BENEFICIARY = {
  121: 'Caregivers of people with disabilities or chronic conditions',
  122: 'Chronically unemployed persons',
  123: 'Foreign migrant or domestic workers',
  124: 'Former offenders / incarcerated individuals',
  125: 'Organisations in the social sector',
  126: 'Persons from low-income families',
  127: 'Persons with debilitating health conditions',
  128: 'Persons with mental health conditions',
  129: 'Persons with mobility challenges',
  130: 'Persons with physical or developmental disabilities',
  131: 'Single parents',
  132: 'Youth-at-risk',
};

const decode = (s) =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
   .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const codes = (s) => (s ? s.split(',').map(Number) : []);

const rows = readFileSync(join(root, 'data', 'raise-directory.tsv'), 'utf8').trim().split('\n');
const entries = rows.map((line, idx) => {
  const f = line.split('\t');
  if (f.length !== 7) throw new Error(`Row ${idx + 1}: expected 7 fields, got ${f.length}`);
  const [id, name, tier, industry, impact, ben, slug] = f;
  if (!TIERS[tier]) throw new Error(`Row ${idx + 1}: unknown tier code ${tier}`);
  const industryCode = industry ? Number(industry) : null;
  return {
    id: Number(id),
    name: decode(name),
    tierCode: Number(tier),
    tier: TIERS[tier],
    industryCode,
    industry: industryCode ? INDUSTRY[industryCode] ?? `Unknown (${industryCode})` : null,
    impact: codes(impact).map((c) => IMPACT[c] ?? `Unknown (${c})`),
    beneficiaryCodes: codes(ben),
    beneficiaries: codes(ben).map((c) => BENEFICIARY[c] ?? `Unknown (${c})`),
    url: `https://www.raise.sg/directory/${slug}/`,
  };
});

const out = {
  source: 'https://www.raise.sg/raise-membership-directory/ (public WordPress REST API: /wp-json/wp/v2/directory)',
  scope: meta.scope,
  fetchedOn,
  count: entries.length,
  entries,
};
writeFileSync(join(root, 'src', 'data', 'raiseDirectory.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`Wrote ${entries.length} entries (fetched ${fetchedOn})`);
