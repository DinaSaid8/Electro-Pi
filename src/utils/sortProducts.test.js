import { describe, expect, it } from 'vitest';
import { SORT_OPTIONS } from '../constants';
import { sortProducts } from './sortProducts';

describe('sortProducts', () => {
  const items = [
    { id: 1, price: 30 },
    { id: 2, price: 10 },
    { id: 3, price: 20 },
  ];

  it('returns items unchanged for default sort', () => {
    expect(sortProducts(items, SORT_OPTIONS.DEFAULT)).toEqual(items);
  });

  it('sorts by price ascending', () => {
    const sorted = sortProducts(items, SORT_OPTIONS.PRICE_ASC);
    expect(sorted.map((p) => p.price)).toEqual([10, 20, 30]);
  });

  it('sorts by price descending', () => {
    const sorted = sortProducts(items, SORT_OPTIONS.PRICE_DESC);
    expect(sorted.map((p) => p.price)).toEqual([30, 20, 10]);
  });
});
