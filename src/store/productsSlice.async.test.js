import { configureStore } from '@reduxjs/toolkit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import productsReducer, { loadProducts } from './productsSlice';

vi.mock('../api/products', () => ({
  fetchProducts: vi.fn(),
  searchProducts: vi.fn(),
  fetchProductsByCategory: vi.fn(),
}));

import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
} from '../api/products';

describe('loadProducts thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function createStore(preloadedState) {
    return configureStore({
      reducer: { products: productsReducer },
      preloadedState: preloadedState ? { products: preloadedState } : undefined,
    });
  }

  it('loads first page of products', async () => {
    fetchProducts.mockResolvedValue({
      products: [{ id: 1, title: 'Phone', price: 99 }],
      total: 1,
    });

    const store = createStore();
    await store.dispatch(loadProducts({ append: false }));

    const state = store.getState().products;
    expect(state.items).toHaveLength(1);
    expect(state.total).toBe(1);
    expect(state.loading).toBe(false);
    expect(fetchProducts).toHaveBeenCalledWith(12, 0);
  });

  it('uses search endpoint when query is set', async () => {
    searchProducts.mockResolvedValue({
      products: [{ id: 2, title: 'Laptop', price: 999 }],
      total: 1,
    });

    const store = createStore({
      items: [],
      categories: [],
      total: 0,
      searchQuery: 'laptop',
      category: '',
      sortBy: 'default',
      loading: false,
      loadingMore: false,
      categoriesLoading: false,
      error: null,
      categoriesError: null,
    });

    await store.dispatch(loadProducts({ append: false }));

    expect(searchProducts).toHaveBeenCalledWith('laptop', 12, 0);
    expect(fetchProducts).not.toHaveBeenCalled();
  });

  it('stores error message on failure', async () => {
    fetchProducts.mockRejectedValue(new Error('Network down'));

    const store = createStore();
    await store.dispatch(loadProducts({ append: false }));

    expect(store.getState().products.error).toBe('Network down');
    expect(store.getState().products.items).toEqual([]);
  });
});
