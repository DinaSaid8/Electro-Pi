import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import ErrorAlert from '../components/common/ErrorAlert';
import Button from '../components/common/Button';
import ProductGrid from '../components/products/ProductGrid';
import ProductGridSkeleton from '../components/products/ProductGridSkeleton';
import ProductLoadMore from '../components/products/ProductLoadMore';
import SearchFilter from '../components/products/SearchFilter';
import { SEARCH_DEBOUNCE_MS, SORT_OPTIONS } from '../constants';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import {
  getFiltersFromUrl,
  useProductFiltersUrl,
} from '../hooks/useProductFiltersUrl';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loadCategories,
  loadProducts,
  selectCategories,
  selectHasMore,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectProductsLoadingMore,
  selectProductsTotal,
  setCategory,
  setSearchQuery,
  setSortBy,
} from '../store/productsSlice';
import { sortProducts } from '../utils/sortProducts';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const urlFiltersRef = useRef(getFiltersFromUrl(searchParams));

  const [searchInput, setSearchInput] = useState(urlFiltersRef.current.q);
  const [urlSyncEnabled, setUrlSyncEnabled] = useState(false);
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  const products = useAppSelector(selectProducts);
  const total = useAppSelector(selectProductsTotal);
  const categories = useAppSelector(selectCategories);
  const category = useAppSelector((s) => s.products.category);
  const sortBy = useAppSelector((s) => s.products.sortBy);
  const loading = useAppSelector(selectProductsLoading);
  const loadingMore = useAppSelector(selectProductsLoadingMore);
  const error = useAppSelector(selectProductsError);
  const hasMore = useAppSelector(selectHasMore);

  const displayedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy],
  );

  useEffect(() => {
    const filters = urlFiltersRef.current;
    dispatch(setCategory(filters.category));
    dispatch(setSortBy(filters.sort));
    dispatch(setSearchQuery(filters.q));
    setUrlSyncEnabled(true);
  }, [dispatch]);

  useProductFiltersUrl(debouncedSearch, category, sortBy, urlSyncEnabled);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(loadProducts({ append: false }));
  }, [debouncedSearch, category, dispatch]);

  const clearAllFilters = useCallback(() => {
    setSearchInput('');
    dispatch(setCategory(''));
    dispatch(setSortBy(SORT_OPTIONS.DEFAULT));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || loadingMore || loading) return;
    dispatch(loadProducts({ append: true }));
  }, [dispatch, hasMore, loadingMore, loading]);

  const handleRetry = () => dispatch(loadProducts({ append: false }));

  const sentinelRef = useInfiniteScroll({
    enabled: hasMore && !loading && !loadingMore,
    onLoadMore: handleLoadMore,
  });

  const sortNote =
    sortBy !== SORT_OPTIONS.DEFAULT ? ' · sorted among loaded items' : '';

  return (
    <div>
      <PageHeader
        title="Shop"
        description="Discover gadgets and gear. Filters sync to the URL so you can bookmark or share your search."
      />

      <SearchFilter
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        category={category}
        onCategoryChange={(value) => dispatch(setCategory(value))}
        sortBy={sortBy}
        onSortChange={(value) => dispatch(setSortBy(value))}
        categories={categories}
        onClearSearch={() => setSearchInput('')}
        onClearCategory={() => dispatch(setCategory(''))}
        onClearSort={() => dispatch(setSortBy(SORT_OPTIONS.DEFAULT))}
        onClearAll={clearAllFilters}
      />

      {loading && products.length === 0 && <ProductGridSkeleton />}

      {!loading && error && products.length === 0 && (
        <ErrorAlert message={error} onRetry={handleRetry} />
      )}

      {!loading && !error && displayedProducts.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No matches"
          description="Nothing fits those filters. Try a broader search or a different category."
          action={
            <Button variant="secondary" onClick={clearAllFilters}>
              Reset filters
            </Button>
          }
        />
      )}

      {displayedProducts.length > 0 && (
        <>
          <p
            className="mb-5 flex items-center gap-2 text-sm text-slate-400"
            aria-live="polite"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            {displayedProducts.length} shown · {total} total{sortNote}
          </p>
          <ProductGrid products={displayedProducts} />
          <ProductLoadMore
            shown={products.length}
            total={total}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={handleLoadMore}
            sentinelRef={sentinelRef}
          />
        </>
      )}
    </div>
  );
}
