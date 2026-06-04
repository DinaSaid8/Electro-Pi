import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SORT_OPTIONS } from '../constants';

function buildParams(debouncedSearch, category, sortBy) {
  const params = new URLSearchParams();
  if (debouncedSearch.trim()) params.set('q', debouncedSearch.trim());
  if (category) params.set('category', category);
  if (sortBy && sortBy !== SORT_OPTIONS.DEFAULT) params.set('sort', sortBy);
  return params;
}

/**
 * Writes filter state to the URL (one-way: Redux → URL).
 * Does not read searchParams in the effect deps to avoid sync loops.
 */
export function useProductFiltersUrl(
  debouncedSearch,
  category,
  sortBy,
  enabled = true,
) {
  const [, setSearchParams] = useSearchParams();
  const enabledRef = useRef(enabled);

  enabledRef.current = enabled;

  useEffect(() => {
    if (!enabledRef.current) return;

    setSearchParams(
      (prev) => {
        const next = buildParams(debouncedSearch, category, sortBy);
        if (prev.toString() === next.toString()) {
          return prev;
        }
        return next;
      },
      { replace: true },
    );
  }, [debouncedSearch, category, sortBy, setSearchParams]);
}

export function getFiltersFromUrl(searchParams) {
  return {
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || SORT_OPTIONS.DEFAULT,
  };
}
