import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('tf_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('tf_token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('tf_token', token); else localStorage.removeItem('tf_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('tf_user', JSON.stringify(user)); else localStorage.removeItem('tf_user');
  }, [user]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res?.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const register = async (payload) => {
    const res = await api.register(payload);
    if (res?.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
