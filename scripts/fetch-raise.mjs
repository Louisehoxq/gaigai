#!/usr/bin/env node
// Refreshes data/raise-directory.tsv from raiSE's public directory API, then run
// `node scripts/build-raise.mjs`. Needs open internet access to www.raise.sg.
//
// Scope: social enterprise tiers only (Verified Leading 193, Verified 196,
// Leading 106, Emerging 107). raiSE Impact Community members (108, 194) are
// excluded: they are not classed as social enterprises by raiSE.
//
// Please be polite: this makes ~7 requests. Ask raiSE before republishing the data.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEEP = new Set([193, 196, 106, 107]);
const FIELDS = 'id,link,title,social-enterprise-category,impact-type,industry,beneficiaries';
const base = 'https://www.raise.sg/wp-json/wp/v2/directory';

const rows = [];
for (let page = 1; ; page++) {
  const res = await fetch(`${base}?per_page=100&page=${page}&_fields=${FIELDS}`);
  if (res.status === 400) break; // WordPress returns 400 past the last page
  if (!res.ok) throw new Error(`HTTP ${res.status} on page ${page}`);
  const batch = await res.json();
  for (const r of batch) {
    const tier = (r['social-enterprise-category'] ?? []).find((c) => KEEP.has(c));
    if (!tier) continue;
    const slug = r.link.replace('https://www.raise.sg/directory/', '').replace(/\/$/, '');
    const name = r.title.rendered.replace(/\s+/g, ' ').trim();
    rows.push([r.id, name, tier, (r.industry ?? []).join(','), (r['impact-type'] ?? []).join(','), (r.beneficiaries ?? []).join(','), slug].join('\t'));
  }
  if (batch.length < 100) break;
}
// Newest first, as in the existing snapshot.
rows.sort((a, b) => Number(b.split('\t')[0]) - Number(a.split('\t')[0]));
writeFileSync(join(root, 'data', 'raise-directory.tsv'), rows.join('\n') + '\n');
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(root, 'data', 'raise-directory.meta.json'),
  JSON.stringify({ fetchedOn: today, scope: 'Verified Leading, Verified, Leading and Emerging social enterprises; excludes raiSE Impact Community members' }, null, 2) + '\n',
);
console.log(`Wrote ${rows.length} rows. Now run: node scripts/build-raise.mjs`);
