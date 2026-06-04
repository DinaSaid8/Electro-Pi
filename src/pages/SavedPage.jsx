import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import ProductGrid from '../components/products/ProductGrid';
import { useFavorites } from '../context/FavoritesContext';

export default function SavedPage() {
  const { favorites, count } = useFavorites();

  return (
    <div>
      <PageHeader
        title="Saved"
        description={
          count === 0
            ? 'Tap the star on any product to build your shortlist. Saved locally on this device.'
            : `${count} item${count === 1 ? '' : 's'} in your shortlist`
        }
      />

      {count === 0 ? (
        <EmptyState
          icon="★"
          title="No saved products yet"
          description="When you find something you like, save it with the star icon on the product card."
          action={
            <Link to="/" className="no-underline">
              <Button>Start shopping</Button>
            </Link>
          }
        />
      ) : (
        <ProductGrid products={favorites} />
      )}
    </div>
  );
}
