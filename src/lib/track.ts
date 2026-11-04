import { SocialEnterprise } from '../types';

/**
 * Anonymous event counting for the pilot. No cookies, no user id, no IP stored.
 * Events are counted per enterprise so each SE can see what GaiGai sent them.
 */
export type TrackEvent = 'qr_scan' | 'outbound_click' | 'trail_add' | 'raise_record_click';

export function track(event: TrackEvent, enterpriseId: string, extra?: { medium?: string }): void {
  try {
    const body = JSON.stringify({ event, enterpriseId, medium: extra?.medium ?? null });
    const blob = new Blob([body], { type: 'application/json' });
    if (!(navigator.sendBeacon && navigator.sendBeacon('/api/events', blob))) {
      void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
    }
  } catch {
    /* counting must never break the app */
  }
}

/** Website URL with campaign tags so the SE can see GaiGai visits in their own analytics. */
export function trackedUrl(ent: SocialEnterprise, medium: string): string {
  try {
    const u = new URL(ent.website);
    u.searchParams.set('utm_source', 'gaigai');
    u.searchParams.set('utm_medium', medium);
    u.searchParams.set('utm_campaign', 'pilot');
    return u.toString();
  } catch {
    return ent.website;
  }
}
