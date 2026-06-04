import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../api/auth';
import { setUnauthorizedHandler } from '../api/client';
import { invalidateCachePrefix } from '../utils/cache';
import {
  clearAuthStorage,
  getStoredUser,
  getToken,
  setStoredUser,
  setTokens,
} from '../utils/storage';

const AuthContext = createContext(null);

function SessionExpiryHandler({ onExpire }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      onExpire();
      navigate('/login?session=expired', { replace: true });
    });
    return () => setUnauthorizedHandler(null);
  }, [navigate, onExpire]);

  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = Boolean(getToken() && user);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(username, password);
      const accessToken = data.accessToken ?? data.token;
      if (!accessToken) {
        throw new Error('No access token received from server');
      }
      setTokens(accessToken, data.refreshToken);
      const profile = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      };
      setStoredUser(profile);
      setUser(profile);
      invalidateCachePrefix('products');
      return profile;
    } catch (err) {
      const message = err.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRegister({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        age: Number(formData.age) || 25,
      });
      return data;
    } catch (err) {
      const message = err.message || 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    invalidateCachePrefix('products');
    setUser(null);
    setError(null);
  }, []);

  const handleSessionExpired = useCallback(() => {
    clearAuthStorage();
    invalidateCachePrefix('products');
    setUser(null);
    setError('Your session expired. Please sign in again.');
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated,
      login,
      register,
      logout,
      clearError: () => setError(null),
    }),
    [user, loading, error, isAuthenticated, login, register, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      <SessionExpiryHandler onExpire={handleSessionExpired} />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
