import React from 'react';
import { BeneficiaryGroup, SocialEnterprise } from '../types';

/**
 * Who an enterprise employs or serves. Keys map to raiSE's beneficiary tags
 * (codes in brackets), except `older_workers`, which raiSE does not track.
 */
export const GROUP_LABELS: Record<BeneficiaryGroup, string> = {
  disabilities: 'Persons with disabilities', // raiSE 127, 129, 130
  mental_health: 'Persons with mental health conditions', // 128
  ex_offenders: 'Former offenders', // 124
  single_parents: 'Single parents', // 131
  youth_at_risk: 'Youth-at-risk', // 132
  low_income: 'Persons from low-income families', // 126
  unemployed: 'Chronically unemployed persons', // 122
  older_workers: 'Older workers (not a raiSE category)',
};

/** raiSE beneficiary term id -> group key. Terms not listed (caregivers, migrant workers, social sector) are ignored. */
export const RAISE_CODE_TO_GROUP: Record<number, BeneficiaryGroup> = {
  127: 'disabilities',
  129: 'disabilities',
  130: 'disabilities',
  128: 'mental_health',
  124: 'ex_offenders',
  131: 'single_parents',
  132: 'youth_at_risk',
  126: 'low_income',
  122: 'unemployed',
};

export const GROUP_KEYS = Object.keys(GROUP_LABELS) as BeneficiaryGroup[];

/** True if the enterprise is tagged with the group by raiSE or describes itself that way. */
export function matchesGroup(ent: SocialEnterprise, sel: BeneficiaryGroup | 'all'): boolean {
  return sel === 'all' || ent.groups.includes(sel) || ent.selfDescribedGroups.includes(sel);
}

export const GroupOptions: React.FC = () => (
  <>
    <option value="all">All groups</option>
    {GROUP_KEYS.map((k) => (
      <option key={k} value={k}>{GROUP_LABELS[k]}</option>
    ))}
  </>
);
