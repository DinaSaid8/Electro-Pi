import { Link, useParams } from 'react-router-dom';
import FavoriteButton from '../components/products/FavoriteButton';
import StarRating from '../components/common/StarRating';
import ErrorAlert from '../components/common/ErrorAlert';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useProduct } from '../hooks/useProduct';
import { formatCategoryLabel } from '../utils/categories';
import { getDiscountLabel, getStockLabel } from '../utils/productDisplay';
import { ApiError } from '../api/client';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error, retry } = useProduct(id);

  const image = product?.images?.[0] || product?.thumbnail;
  const isNotFound = error instanceof ApiError && error.status === 404;
  const discount = product ? getDiscountLabel(product) : null;
  const stock = product ? getStockLabel(product.stock) : null;

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-amber-400"
      >
        <span aria-hidden="true">←</span> Back to shop
      </Link>

      {loading && <LoadingSpinner label="Loading product…" />}

      {!loading && isNotFound && (
        <div className="glass-panel py-16 text-center">
          <p className="text-5xl font-bold text-slate-700">404</p>
          <p className="mt-4 text-lg font-semibold text-white">Product not found</p>
          <p className="mt-2 text-slate-400">It may have been removed or the link is wrong.</p>
          <Link
            to="/"
            className="mt-8 inline-block rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-slate-950 no-underline hover:bg-amber-500"
          >
            Browse catalog
          </Link>
        </div>
      )}

      {!loading && error && !isNotFound && (
        <ErrorAlert message={error.message || String(error)} onRetry={retry} />
      )}

      {!loading && !error && product && (
        <article className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative">
            <div className="glass-panel relative aspect-square overflow-hidden">
              <FavoriteButton
                product={product}
                className="absolute right-4 top-4 z-10 rounded-full bg-slate-950/90 shadow-lg ring-1 ring-white/10"
              />
              {discount && (
                <span className="absolute left-4 top-4 rounded-xl bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-lg">
                  {discount}
                </span>
              )}
              {image ? (
                <img
                  src={image}
                  alt={product.title}
                  className="h-full w-full object-contain p-8 lg:p-10"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-500">
                  No image available
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            {product.category && (
              <span className="mb-4 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                {formatCategoryLabel(product.category)}
              </span>
            )}

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {product.title}
            </h1>

            {product.rating != null && (
              <div className="mt-4">
                <StarRating rating={product.rating} size="md" />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-end gap-4 border-b border-white/[0.06] pb-6">
              <p className="text-4xl font-bold text-amber-400">
                ${product.price?.toFixed(2)}
              </p>
              {stock && (
                <span
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${
                    stock.tone === 'danger'
                      ? 'bg-red-500/15 text-red-300'
                      : 'bg-orange-500/15 text-orange-300'
                  }`}
                >
                  {stock.text}
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-300">
              {product.description}
            </p>

            <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              {product.brand && (
                <div className="rounded-xl bg-slate-900/50 px-4 py-3 ring-1 ring-white/[0.06]">
                  <dt className="text-slate-500">Brand</dt>
                  <dd className="mt-0.5 font-medium text-white">{product.brand}</dd>
                </div>
              )}
              {product.stock != null && (
                <div className="rounded-xl bg-slate-900/50 px-4 py-3 ring-1 ring-white/[0.06]">
                  <dt className="text-slate-500">Availability</dt>
                  <dd className="mt-0.5 font-medium text-white">{product.stock} in stock</dd>
                </div>
              )}
            </dl>
          </div>
        </article>
      )}
    </div>
  );
}
