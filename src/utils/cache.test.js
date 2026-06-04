import { beforeEach, describe, expect, it } from 'vitest';
import { getCacheEntry, invalidateCache, setCacheEntry } from './cache';

describe('cache', () => {
  beforeEach(() => {
    sessionStorage.clear();
    invalidateCache('test-key');
  });

  it('stores and retrieves data within TTL', () => {
    setCacheEntry('test-key', { foo: 'bar' }, 60_000);
    expect(getCacheEntry('test-key')).toEqual({ foo: 'bar' });
  });

  it('returns null for missing keys', () => {
    expect(getCacheEntry('missing')).toBeNull();
  });
});
