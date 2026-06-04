import Button from '../common/Button';

export default function ProductLoadMore({
  shown,
  total,
  hasMore,
  loadingMore,
  onLoadMore,
  sentinelRef,
}) {
  if (total === 0) return null;

  const progress = Math.min(100, Math.round((shown / total) * 100));

  return (
    <div className="mt-10 flex flex-col items-center gap-5">
      <div className="w-full max-w-md">
        <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
          <span>Loaded {shown} of {total}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {hasMore && (
        <>
          <Button
            variant="secondary"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="min-w-[180px] rounded-xl border-white/10"
          >
            {loadingMore ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-amber-400" />
                Loading…
              </span>
            ) : (
              'Load more products'
            )}
          </Button>
          <div ref={sentinelRef} className="h-2 w-full" aria-hidden="true" />
        </>
      )}

      {!hasMore && shown > 0 && (
        <p className="text-sm text-slate-500">You&apos;ve seen all {total} products</p>
      )}
    </div>
  );
}
