import { useEffect, useRef } from 'react';

/**
 * Calls `onLoadMore` when the sentinel element enters the viewport.
 * Used for infinite-scroll product loading.
 */
export function useInfiniteScroll({ enabled, onLoadMore, rootMargin = '200px' }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!enabled || !onLoadMore) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, onLoadMore, rootMargin]);

  return sentinelRef;
}
