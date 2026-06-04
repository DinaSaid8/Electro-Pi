import { describe, expect, it } from 'vitest';
import productsReducer, {
  setCategory,
  setSearchQuery,
  setSortBy,
} from './productsSlice';

describe('productsSlice', () => {
  const initialState = productsReducer(undefined, { type: '@@INIT' });

  it('has expected initial state', () => {
    expect(initialState.items).toEqual([]);
    expect(initialState.loading).toBe(false);
    expect(initialState.searchQuery).toBe('');
  });

  it('setSearchQuery updates search query', () => {
    const state = productsReducer(initialState, setSearchQuery('phone'));
    expect(state.searchQuery).toBe('phone');
  });

  it('setCategory updates category filter', () => {
    const state = productsReducer(initialState, setCategory('laptops'));
    expect(state.category).toBe('laptops');
  });

  it('setSortBy updates sort option', () => {
    const state = productsReducer(initialState, setSortBy('price-asc'));
    expect(state.sortBy).toBe('price-asc');
  });
});
