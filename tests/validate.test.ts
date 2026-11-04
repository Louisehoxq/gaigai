import { describe, expect, it } from 'vitest';
import { makeLimiter, validateAudio, validateEvent, validateLocation, validateQuery } from '../server/validate';

describe('validateEvent', () => {
  it('accepts a good event', () => {
    expect(validateEvent({ event: 'qr_scan', enterpriseId: 'teddythotz' })).toEqual({ event: 'qr_scan', enterpriseId: 'teddythotz', medium: null });
    expect(validateEvent({ event: 'outbound_click', enterpriseId: 'foreword-coffee', medium: 'card' })?.medium).toBe('card');
  });
  it.each([
    [null], ['x'], [{}], [{ event: 'drop table', enterpriseId: 'a' }],
    [{ event: 'qr_scan', enterpriseId: '../etc/passwd' }],
    [{ event: 'qr_scan', enterpriseId: 'A' }],
    [{ event: 'qr_scan', enterpriseId: 'a'.repeat(41) }],
    [{ event: 'qr_scan', enterpriseId: 'ok', medium: 'Bad Medium!' }],
    [{ event: 'qr_scan', enterpriseId: 5 }],
  ])('rejects %j', (body) => {
    expect(validateEvent(body)).toBeNull();
  });
});

describe('validateQuery', () => {
  it('trims and collapses whitespace and control characters', () => {
    expect(validateQuery('  inclusive\n\tcafe  ')).toBe('inclusive cafe');
  });
  it('rejects empty, non-string and over-long queries', () => {
    expect(validateQuery('   ')).toBeNull();
    expect(validateQuery(12)).toBeNull();
    expect(validateQuery('a'.repeat(301))).toBeNull();
    expect(validateQuery('a'.repeat(300))).not.toBeNull();
  });
});

describe('validateLocation', () => {
  it('keeps a point inside Singapore', () => {
    expect(validateLocation({ latitude: 1.30, longitude: 103.85 })).toEqual({ latitude: 1.3, longitude: 103.85 });
  });
  it('falls back to the island centre for anything else', () => {
    const centre = { latitude: 1.3521, longitude: 103.8198 };
    expect(validateLocation({ latitude: 51.5, longitude: -0.1 })).toEqual(centre);
    expect(validateLocation({ latitude: '1.3', longitude: '103.8' })).toEqual(centre);
    expect(validateLocation(undefined)).toEqual(centre);
  });
});

describe('validateAudio', () => {
  it('accepts base64 audio and strips codec parameters', () => {
    expect(validateAudio('QUJD', 'audio/webm;codecs=opus')).toEqual({ mimeType: 'audio/webm', data: 'QUJD' });
  });
  it('rejects non-base64, wrong types and oversize payloads', () => {
    expect(validateAudio('not base64!!', 'audio/webm')).toBeNull();
    expect(validateAudio('QUJD', 'text/html')).toBeNull();
    expect(validateAudio('', 'audio/webm')).toBeNull();
    expect(validateAudio('A'.repeat(7_000_001), 'audio/webm')).toBeNull();
  });
});

describe('makeLimiter', () => {
  it('allows up to max per window then blocks, then resets', () => {
    let t = 0;
    const l = makeLimiter(2, 1000, () => t);
    expect([l.allow('a'), l.allow('a'), l.allow('a')]).toEqual([true, true, false]);
    expect(l.allow('b')).toBe(true); // other clients unaffected
    t = 1000;
    expect(l.allow('a')).toBe(true); // new window
  });
});
