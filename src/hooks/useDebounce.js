import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` after `delayMs`.
 */
export function useDebounce(value, delayMs) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
