import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, loginApi, registerApi } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
          // console.log('Initializing auth from localStorage:', storedUser);   
          setUser(JSON.parse(storedUser));

        } else {
          const token = localStorage.getItem('token');
          if (token) {
            const data = await getMe();
            if (data) setUser(data.user || data);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async credentials => {
    const data = await loginApi(credentials);
    if ((data?.accessToken || data?.token) && data?.user) {
      const userWithToken = {
        ...data.user,
        token: data.accessToken || data.token,
      };
      localStorage.setItem('user', JSON.stringify(userWithToken));
      setUser(userWithToken)
    }
    return data;
  };

  const register = async userData => {
    const data = await registerApi(userData);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user,setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
