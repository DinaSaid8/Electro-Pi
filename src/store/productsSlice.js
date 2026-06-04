import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from '../api/products';
import { CACHE_KEYS, CACHE_TTL_MS, PAGE_SIZE } from '../constants';
import { getCacheEntry, setCacheEntry } from '../utils/cache';
import { normalizeCategories } from '../utils/categories';

/**
 * Loads category options for the filter dropdown (cached).
 */
export const loadCategories = createAsyncThunk(
  'products/loadCategories',
  async (_, { rejectWithValue }) => {
    try {
      const cached = getCacheEntry(CACHE_KEYS.CATEGORIES);
      if (cached) return normalizeCategories(cached);

      const data = await fetchCategories();
      const normalized = normalizeCategories(data);
      setCacheEntry(CACHE_KEYS.CATEGORIES, normalized, CACHE_TTL_MS);
      return normalized;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load categories');
    }
  },
);

/**
 * Fetches a page of products. Set `append: true` for infinite scroll.
 */
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async ({ append = false }, { getState, rejectWithValue }) => {
    const { searchQuery, category, items } = getState().products;
    const skip = append ? items.length : 0;
    const trimmed = searchQuery.trim();

    try {
      let data;
      if (trimmed) {
        data = await searchProducts(trimmed, PAGE_SIZE, skip);
      } else if (category) {
        data = await fetchProductsByCategory(category, PAGE_SIZE, skip);
      } else {
        data = await fetchProducts(PAGE_SIZE, skip);
      }

      return {
        products: data.products ?? [],
        total: data.total ?? 0,
        append,
      };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load products');
    }
  },
);

const initialState = {
  items: [],
  categories: [],
  total: 0,
  searchQuery: '',
  category: '',
  sortBy: 'default',
  loading: false,
  loadingMore: false,
  categoriesLoading: false,
  error: null,
  categoriesError: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    clearProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      })
      .addCase(loadProducts.pending, (state, action) => {
        const append = action.meta.arg?.append;
        if (append) {
          state.loadingMore = true;
        } else {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const { products, total, append } = action.payload;
        state.loading = false;
        state.loadingMore = false;
        state.total = total;
        state.items = append ? [...state.items, ...products] : products;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
        if (!action.meta.arg?.append) {
          state.items = [];
        }
      });
  },
});

export const { setSearchQuery, setCategory, setSortBy, clearProductsError } =
  productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsTotal = (state) => state.products.total;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsLoadingMore = (state) => state.products.loadingMore;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectHasMore = (state) =>
  state.products.items.length < state.products.total;

export default productsSlice.reducer;
