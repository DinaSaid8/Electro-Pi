import { apiRequest } from './client';

/**
 * Builds query string for paginated product endpoints.
 */
function paginationQuery(limit, skip) {
  return `limit=${limit}&skip=${skip}`;
}

export function fetchProducts(limit, skip = 0) {
  return apiRequest(`/products?${paginationQuery(limit, skip)}`);
}

export function searchProducts(query, limit, skip = 0) {
  const encoded = encodeURIComponent(query.trim());
  return apiRequest(
    `/products/search?q=${encoded}&${paginationQuery(limit, skip)}`,
  );
}

export function fetchProductsByCategory(category, limit, skip = 0) {
  const encoded = encodeURIComponent(category);
  return apiRequest(
    `/products/category/${encoded}?${paginationQuery(limit, skip)}`,
  );
}

export function fetchProductById(id) {
  return apiRequest(`/products/${id}`);
}

export function fetchCategories() {
  return apiRequest('/products/categories');
}
