// import { createContext, useState, useEffect } from 'react';
// import axios from '../api/axiosConfig';
// import process from 'process';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
//         if (token) {
//           const response = await axios.get('/auth/me');
//           setUser(response.data);
//         }
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };
//     initializeAuth();
//   }, []);

//   const login = async (credentials) => {
//     const response = await axios.post('/auth/login', credentials);
//     localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, response.data.token);
//     setUser(response.data.user);
//     return response.data;
//   };

//   const register = async (userData) => {
//     const response = await axios.post('/auth/register', userData);
//     localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, response.data.token);
//     setUser(response.data.user);
//     return response.data;
//   };

//   const logout = () => {
//     localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };