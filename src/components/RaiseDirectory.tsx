import React, { useMemo, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { RAISE_ENTRIES, RAISE_FETCHED_ON, beneficiaryOptions } from '../data/raise';

const TIER_ORDER = ['Verified Leading', 'Verified', 'Leading', 'Emerging'];
const INDUSTRY_PRESETS: { id: string; label: string; match: (i: string | null) => boolean }[] = [
  { id: 'fnb-retail', label: 'F&B and retail', match: (i) => i === 'Food & Beverage' || i === 'Fashion & Retail' },
  { id: 'consumer', label: 'F&B, retail, beauty, arts and household', match: (i) =>
      ['Food & Beverage', 'Fashion & Retail', 'Beauty & Wellness', 'Arts, Sports & Recreation', 'Household Services'].includes(i ?? '') },
  { id: 'all', label: 'All industries', match: () => true },
];

export const RaiseDirectory: React.FC = () => {
  const [preset, setPreset] = useState('fnb-retail');
  const [inclusiveOnly, setInclusiveOnly] = useState(true);
  const [tier, setTier] = useState('all');
  const [group, setGroup] = useState('all');
  const [q, setQ] = useState('');
  const groups = useMemo(() => beneficiaryOptions(), []);

  const rows = useMemo(() => {
    const industry = INDUSTRY_PRESETS.find((p) => p.id === preset)!;
    const needle = q.trim().toLowerCase();
    return RAISE_ENTRIES.filter((e) => {
      if (!industry.match(e.industry)) return false;
      if (inclusiveOnly && !e.impact.includes('Inclusive employment')) return false;
      if (tier !== 'all' && e.tier !== tier) return false;
      if (group !== 'all' && !e.beneficiaries.includes(group)) return false;
      if (needle && !e.name.toLowerCase().includes(needle)) return false;
      return true;
    }).sort(
      (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) || a.name.localeCompare(b.name),
    );
  }, [preset, inclusiveOnly, tier, group, q]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">raiSE directory</h2>
        <p className="text-xs text-stone-600 max-w-3xl">
          {RAISE_ENTRIES.length} social enterprise members of raiSE (Singapore Centre for Social Enterprise), copied from the{' '}
          <a className="underline" href="https://www.raise.sg/raise-membership-directory/" target="_blank" rel="noopener noreferrer">public directory</a>{' '}
          on {RAISE_FETCHED_ON}. Tiers and tags are raiSE&apos;s, not GaiGai&apos;s. The directory has no addresses or opening hours, so these places are not on the map yet.
          Inclusive employment is a tag the enterprise gave itself; only the Verified Leading tier is checked by raiSE.
        </p>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
        <label className="space-y-1">
          <span className="font-semibold text-stone-600">Search name</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. coffee" className="w-full border border-stone-300 rounded-lg px-2.5 py-2 bg-stone-50" />
        </label>
        <label className="space-y-1">
          <span className="font-semibold text-stone-600">Industry</span>
          <select value={preset} onChange={(e) => setPreset(e.target.value)} className="w-full border border-stone-300 rounded-lg px-2.5 py-2 bg-stone-50">
            {INDUSTRY_PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="font-semibold text-stone-600">raiSE tier</span>
          <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full border border-stone-300 rounded-lg px-2.5 py-2 bg-stone-50">
            <option value="all">All tiers</option>
            {TIER_ORDER.filter((t) => RAISE_ENTRIES.some((e) => e.tier === t)).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="font-semibold text-stone-600">Who they employ or serve</span>
          <select value={group} onChange={(e) => setGroup(e.target.value)} className="w-full border border-stone-300 rounded-lg px-2.5 py-2 bg-stone-50">
            <option value="all">All groups</option>
            {groups.map((g) => <option key={g.label} value={g.label}>{g.label} ({g.count})</option>)}
          </select>
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input type="checkbox" checked={inclusiveOnly} onChange={(e) => setInclusiveOnly(e.target.checked)} />
          <span className="font-semibold text-stone-700">Tagged inclusive employment only</span>
        </label>
      </div>

      <p className="text-xs text-stone-500" aria-live="polite">Showing <strong>{rows.length}</strong> of {RAISE_ENTRIES.length}</p>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((e) => (
          <li key={e.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900">{e.name}</h3>
              <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${e.tier === 'Verified Leading' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-stone-50 text-stone-700 border-stone-200'}`}>
                {e.tier === 'Verified Leading' && <ShieldCheck className="w-3 h-3" aria-hidden="true" />}
                {e.tier}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">{e.industry ?? 'Industry not listed'}</p>
            <p className="text-[11px] text-stone-600">
              {e.impact.length ? e.impact.join(' · ') : 'No impact type listed'}
            </p>
            {e.beneficiaries.length > 0 && (
              <p className="text-[11px] text-stone-500 line-clamp-3">{e.beneficiaries.join(', ')}</p>
            )}
            <a href={e.url} target="_blank" rel="noopener noreferrer" className="mt-auto text-[11px] font-semibold text-rose-700 hover:text-rose-800 inline-flex items-center gap-1">
              raiSE record <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
