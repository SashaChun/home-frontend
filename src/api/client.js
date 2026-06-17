import axios from 'axios';
import { firebaseAuth } from '../auth/firebase.js';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
});

api.interceptors.request.use(async (config) => {
  const u = firebaseAuth.currentUser;
  if (u) {
    const token = await u.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    const msg = e?.response?.data?.error?.message || e.message || 'Network error';
    return Promise.reject(Object.assign(e, { uiMessage: msg }));
  },
);
