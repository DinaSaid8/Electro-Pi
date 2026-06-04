import { SORT_OPTIONS } from '../../constants';
import { formatCategoryLabel } from '../../utils/categories';

export default function ActiveFilterChips({
  searchQuery,
  category,
  sortBy,
  onClearSearch,
  onClearCategory,
  onClearSort,
  onClearAll,
}) {
  const hasFilters =
    searchQuery.trim() || category || (sortBy && sortBy !== SORT_OPTIONS.DEFAULT);

  if (!hasFilters) return null;

  const chipClass =
    'inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Active
      </span>

      {searchQuery.trim() && (
        <span className={chipClass}>
          “{searchQuery.trim()}”
          <button
            type="button"
            onClick={onClearSearch}
            className="ml-0.5 rounded-full p-0.5 hover:bg-amber-500/20"
            aria-label="Clear search"
          >
            ×
          </button>
        </span>
      )}

      {category && (
        <span className={chipClass}>
          {formatCategoryLabel(category)}
          <button
            type="button"
            onClick={onClearCategory}
            className="ml-0.5 rounded-full p-0.5 hover:bg-amber-500/20"
            aria-label="Clear category"
          >
            ×
          </button>
        </span>
      )}

      {sortBy && sortBy !== SORT_OPTIONS.DEFAULT && (
        <span className={chipClass}>
          {sortBy === SORT_OPTIONS.PRICE_ASC ? 'Price ↑' : 'Price ↓'}
          <button
            type="button"
            onClick={onClearSort}
            className="ml-0.5 rounded-full p-0.5 hover:bg-amber-500/20"
            aria-label="Clear sort"
          >
            ×
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
