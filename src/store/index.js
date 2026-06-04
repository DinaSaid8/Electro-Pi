import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

/**
 * Redux store — product list, filters, and pagination state.
 * Auth remains in React Context (see context/AuthContext.jsx).
 */
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
