import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';
import { getDiscountLabel, getStockLabel } from '../../utils/productDisplay';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product }) {
  const image = product.thumbnail || product.images?.[0];
  const discount = getDiscountLabel(product);
  const stock = getStockLabel(product.stock);

  return (
    <div className="group relative">
      <FavoriteButton
        product={product}
        className="absolute right-3 top-3 z-10 rounded-full bg-slate-950/80 shadow-lg backdrop-blur-md ring-1 ring-white/10"
      />

      <Link
        to={`/products/${product.id}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/50 no-underline shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-slate-800/80 to-slate-900">
          {discount && (
            <span className="absolute left-3 top-3 z-[1] rounded-lg bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow">
              {discount}
            </span>
          )}
          {image ? (
            <img
              src={image}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-600">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          {product.rating != null && <StarRating rating={product.rating} />}

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-amber-100">
            {product.title}
          </h3>

          <div className="mt-auto flex items-baseline justify-between gap-2">
            <p className="text-xl font-bold text-amber-400">
              ${product.price?.toFixed(2)}
            </p>
            {stock && (
              <span
                className={`text-xs font-medium ${
                  stock.tone === 'danger' ? 'text-red-400' : 'text-orange-400'
                }`}
              >
                {stock.text}
              </span>
            )}
          </div>

          {product.category && (
            <span className="text-xs capitalize text-slate-500">
              {product.category.replace(/-/g, ' ')}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
