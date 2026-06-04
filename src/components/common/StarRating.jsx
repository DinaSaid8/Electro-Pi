export default function StarRating({ rating, size = 'sm' }) {
  if (rating == null) return null;

  const stars = 5;
  const filled = Math.round(rating);
  const sizeClass = size === 'sm' ? 'text-xs gap-0.5' : 'text-sm gap-1';

  return (
    <div
      className={`inline-flex items-center ${sizeClass}`}
      aria-label={`Rating ${rating} out of 5`}
    >
      {Array.from({ length: stars }, (_, i) => (
        <span
          key={i}
          className={i < filled ? 'text-amber-400' : 'text-slate-600'}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="ml-1 font-medium text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
}
