import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SORT_OPTIONS } from '../../constants';
import SearchFilter from './SearchFilter';

const categories = [
  { slug: 'laptops', name: 'Laptops' },
  { slug: 'phones', name: 'Smartphones' },
];

const defaultProps = {
  searchQuery: '',
  onSearchChange: () => {},
  category: '',
  onCategoryChange: () => {},
  sortBy: SORT_OPTIONS.DEFAULT,
  onSortChange: () => {},
  onClearSearch: () => {},
  onClearCategory: () => {},
  onClearSort: () => {},
  onClearAll: () => {},
  categories,
};

describe('SearchFilter', () => {
  it('renders search, category, and sort controls', () => {
    render(<SearchFilter {...defaultProps} />);

    expect(screen.getByLabelText(/^search$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^sort$/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Laptops' })).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchFilter {...defaultProps} onSearchChange={onSearchChange} />);

    await user.type(screen.getByLabelText(/^search$/i), 'a');
    expect(onSearchChange).toHaveBeenCalled();
  });
});
