const SKELETON_COUNT = 8;

function SkeletonCard() {
  return (
    <div className="shimmer overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/50">
      <div className="aspect-square bg-slate-800/80" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 rounded-full bg-slate-800" />
        <div className="h-4 w-full rounded-lg bg-slate-800" />
        <div className="h-4 w-2/3 rounded-lg bg-slate-800" />
        <div className="h-6 w-1/3 rounded-lg bg-slate-800" />
      </div>
    </div>
  );
}

export default function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
