export default function LoadingSpinner({ label = 'Loading…', compact = false }) {
  if (compact) {
    return (
      <span
        className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-amber-400"
        role="status"
        aria-label={label}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-4 py-16"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-11 w-11 animate-spin rounded-full border-[3px] border-slate-700 border-t-amber-400"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}
