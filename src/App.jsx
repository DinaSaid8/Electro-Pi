import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import SavedPage from './pages/SavedPage';
import { store } from './store';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <FavoritesProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <ProductsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="products/:id"
                    element={
                      <ProtectedRoute>
                        <ProductDetailPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="saved"
                    element={
                      <ProtectedRoute>
                        <SavedPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </FavoritesProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}
