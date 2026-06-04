import { apiRequest } from './client';

export function login(username, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { username, password, expiresInMins: 30 },
  });
}

export function register(userData) {
  return apiRequest('/users/add', {
    method: 'POST',
    body: userData,
  });
}

export function getAuthUser() {
  return apiRequest('/auth/me', { auth: true });
}
