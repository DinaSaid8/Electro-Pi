import { useCallback, useEffect, useState } from 'react';
import { fetchProductById } from '../api/products';
import { CACHE_TTL_MS } from '../constants';
import { getCacheEntry, setCacheEntry } from '../utils/cache';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    const cacheKey = `product:${id}`;
    const cached = getCacheEntry(cacheKey);
    if (cached) {
      setProduct(cached);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchProductById(id);
      setCacheEntry(cacheKey, data, CACHE_TTL_MS);
      setProduct(data);
    } catch (err) {
      setError(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { product, loading, error, retry: load };
}
