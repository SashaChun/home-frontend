import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axios
          .post(
            `${import.meta.env.VITE_API_BASE || '/api'}/auth/refresh`,
            {},
            { withCredentials: true },
          )
          .then((r) => {
            localStorage.setItem('accessToken', r.data.accessToken);
            return r.data.accessToken;
          })
          .catch(() => {
            localStorage.removeItem('accessToken');
            return null;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      const token = await refreshPromise;
      if (token) {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }
    }
    const msg = error?.response?.data?.error?.message || error.message || 'Network error';
    return Promise.reject(Object.assign(error, { uiMessage: msg }));
  },
);
