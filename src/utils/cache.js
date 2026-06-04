const memoryCache = new Map();

export function getCacheEntry(key) {
  const mem = memoryCache.get(key);
  if (mem && mem.expiresAt > Date.now()) {
    return mem.data;
  }
  if (mem) memoryCache.delete(key);

  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt <= Date.now()) {
      sessionStorage.removeItem(key);
      return null;
    }
    memoryCache.set(key, parsed);
    return parsed.data;
  } catch {
    return null;
  }
}

export function setCacheEntry(key, data, ttlMs) {
  const entry = {
    data,
    expiresAt: Date.now() + ttlMs,
  };
  memoryCache.set(key, entry);
  try {
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    /* quota exceeded — memory cache still works */
  }
}

export function invalidateCache(key) {
  memoryCache.delete(key);
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function invalidateCachePrefix(prefix) {
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) memoryCache.delete(key);
  }
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(prefix)) sessionStorage.removeItem(key);
    }
  } catch {
    /* ignore */
  }
}
