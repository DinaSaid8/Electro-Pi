import { SORT_OPTIONS } from '../constants';

export function sortProducts(products, sortBy) {
  if (!products?.length || sortBy === SORT_OPTIONS.DEFAULT) {
    return products ?? [];
  }

  const sorted = [...products];
  if (sortBy === SORT_OPTIONS.PRICE_ASC) {
    sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  } else if (sortBy === SORT_OPTIONS.PRICE_DESC) {
    sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  }
  return sorted;
}
