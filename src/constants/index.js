/** Number of products fetched per page / infinite-scroll batch */
export const PAGE_SIZE = 12;

/** Debounce delay for search input (ms) */
export const SEARCH_DEBOUNCE_MS = 300;

/** Client-side cache TTL for API responses (ms) */
export const CACHE_TTL_MS = 5 * 60 * 1000;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com';

export const SORT_OPTIONS = {
  DEFAULT: 'default',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
};

export const FAVORITES_STORAGE_KEY = 'prodexa_store_favorites';

export const CACHE_KEYS = {
  PRODUCTS: 'products_list',
  CATEGORIES: 'product_categories',
  USER: 'auth_user',
};

export const TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
