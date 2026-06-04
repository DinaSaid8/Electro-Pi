import { SORT_OPTIONS } from '../../constants';
import ActiveFilterChips from './ActiveFilterChips';

const fieldClass =
  'w-full rounded-xl border border-white/[0.08] bg-slate-950/50 px-3 py-2.5 text-slate-100 transition-colors placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20';

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  onClearSearch,
  onClearCategory,
  onClearSort,
  onClearAll,
}) {
  return (
    <section className="glass-panel mb-8 p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="search" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            >
              ⌕
            </span>
            <input
              id="search"
              type="search"
              placeholder="Search by product name…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoComplete="off"
              className={`${fieldClass} pl-9`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={fieldClass}
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sort
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={fieldClass}
          >
            <option value={SORT_OPTIONS.DEFAULT}>Featured</option>
            <option value={SORT_OPTIONS.PRICE_ASC}>Price: low → high</option>
            <option value={SORT_OPTIONS.PRICE_DESC}>Price: high → low</option>
          </select>
        </div>
      </div>

      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <ActiveFilterChips
          searchQuery={searchQuery}
          category={category}
          sortBy={sortBy}
          onClearSearch={onClearSearch}
          onClearCategory={onClearCategory}
          onClearSort={onClearSort}
          onClearAll={onClearAll}
        />
      </div>
    </section>
  );
}
