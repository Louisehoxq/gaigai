// Pure input validators for the API. No I/O, so they are easy to test.

export const EVENT_NAMES = ['qr_scan', 'outbound_click', 'trail_add', 'raise_record_click'] as const;
const ID_RE = /^[a-z0-9-]{1,40}$/;
const MEDIUM_RE = /^[a-z]{1,20}$/;

export interface ValidEvent {
  event: (typeof EVENT_NAMES)[number];
  enterpriseId: string;
  medium: string | null;
}

export function validateEvent(body: unknown): ValidEvent | null {
  if (!body || typeof body !== 'object') return null;
  const { event, enterpriseId, medium } = body as Record<string, unknown>;
  if (typeof event !== 'string' || !(EVENT_NAMES as readonly string[]).includes(event)) return null;
  if (typeof enterpriseId !== 'string' || !ID_RE.test(enterpriseId)) return null;
  if (medium != null && (typeof medium !== 'string' || !MEDIUM_RE.test(medium))) return null;
  return { event: event as ValidEvent['event'], enterpriseId, medium: (medium as string | null | undefined) ?? null };
}

/** A search query: 1 to 300 characters, control characters removed. */
export function validateQuery(q: unknown): string | null {
  if (typeof q !== 'string') return null;
  // eslint-disable-next-line no-control-regex
  const cleaned = q.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.length >= 1 && cleaned.length <= 300 ? cleaned : null;
}

const SG_CENTRE = { latitude: 1.3521, longitude: 103.8198 };

/** A location inside Singapore's bounding box, else the island centre. */
export function validateLocation(loc: unknown): { latitude: number; longitude: number } {
  if (loc && typeof loc === 'object') {
    const { latitude, longitude } = loc as Record<string, unknown>;
    if (
      typeof latitude === 'number' && typeof longitude === 'number' &&
      latitude > 1.1 && latitude < 1.5 && longitude > 103.55 && longitude < 104.1
    ) {
      return { latitude, longitude };
    }
  }
  return SG_CENTRE;
}

const AUDIO_MIME = new Set(['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/mpeg', 'audio/wav']);
export const MAX_AUDIO_BASE64_CHARS = 7_000_000; // about 5 MB of audio

/** Returns a clean mime type and base64 payload, or null. Codec suffixes ("audio/webm;codecs=opus") are dropped. */
export function validateAudio(audioData: unknown, mimeType: unknown): { mimeType: string; data: string } | null {
  if (typeof audioData !== 'string' || audioData.length === 0 || audioData.length > MAX_AUDIO_BASE64_CHARS) return null;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(audioData)) return null;
  const base = typeof mimeType === 'string' ? mimeType.split(';')[0].trim().toLowerCase() : 'audio/webm';
  if (!AUDIO_MIME.has(base)) return null;
  return { mimeType: base, data: audioData };
}

/** Fixed-window per-key limiter. Returns true if the call is allowed. */
export function makeLimiter(max: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, { n: number; reset: number }>();
  return {
    allow(key: string): boolean {
      const t = now();
      const h = hits.get(key);
      if (!h || t >= h.reset) {
        hits.set(key, { n: 1, reset: t + windowMs });
        return true;
      }
      h.n += 1;
      return h.n <= max;
    },
    sweep(): void {
      const t = now();
      for (const [k, h] of hits) if (t >= h.reset) hits.delete(k);
    },
  };
}
