import { describe, expect, it } from 'vitest';
import { formatCategoryLabel, normalizeCategories } from './categories';

describe('normalizeCategories', () => {
  it('maps object categories to slug and name', () => {
    const input = [{ slug: 'laptops', name: 'Laptops', url: 'https://example.com' }];
    expect(normalizeCategories(input)).toEqual([{ slug: 'laptops', name: 'Laptops' }]);
  });

  it('maps legacy string categories', () => {
    expect(normalizeCategories(['smartphones'])).toEqual([
      { slug: 'smartphones', name: 'Smartphones' },
    ]);
  });

  it('returns empty array for invalid input', () => {
    expect(normalizeCategories(null)).toEqual([]);
    expect(normalizeCategories(undefined)).toEqual([]);
  });
});

describe('formatCategoryLabel', () => {
  it('formats slugs with hyphens', () => {
    expect(formatCategoryLabel('home-decoration')).toBe('Home decoration');
  });

  it('handles empty values', () => {
    expect(formatCategoryLabel('')).toBe('');
    expect(formatCategoryLabel(null)).toBe('');
  });
});
