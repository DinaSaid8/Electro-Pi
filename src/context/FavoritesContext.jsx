import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { loadFavorites, saveFavorites, toFavoriteItem } from '../utils/favorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === Number(id)),
    [favorites],
  );

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      const id = product.id;
      const exists = prev.some((item) => item.id === id);
      const next = exists
        ? prev.filter((item) => item.id !== id)
        : [...prev, toFavoriteItem(product)];
      saveFavorites(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      count: favorites.length,
      isFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
}
