import { createContext, useCallback, useEffect, useState } from 'react';
import { api } from '../api/client.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) { setLoading(false); return; }
    api.get('/auth/me')
      .then((r) => {
        const data = r.data.data;
        setUser({ id: data.id, uid: data.id, email: data.email });
        setProfile(data);
      })
      .catch(() => localStorage.removeItem('accessToken'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const r = await api.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', r.data.accessToken);
    const data = r.data.data;
    setUser({ id: data.id, uid: data.id, email: data.email });
    setProfile(data);
  }, []);

  const register = useCallback(async (displayName, email, password) => {
    const r = await api.post('/auth/register', { displayName, email, password });
    localStorage.setItem('accessToken', r.data.accessToken);
    const data = r.data.data;
    setUser({ id: data.id, uid: data.id, email: data.email });
    setProfile(data);
  }, []);

  const logout = useCallback(async () => {
    await api.post('/auth/logout').catch(() => {});
    localStorage.removeItem('accessToken');
    setUser(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, register, logout, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
