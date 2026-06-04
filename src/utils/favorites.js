import { FAVORITES_STORAGE_KEY } from '../constants';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(items) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
}

/** Store minimal product fields so the saved page works offline from cache */
export function toFavoriteItem(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    images: product.images,
    category: product.category,
  };
}
