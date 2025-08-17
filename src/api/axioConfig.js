import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_TOKEN_KEY,
  headers: {
    // 'Content-Type' : 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

instance.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - is backend server running?');
    }
    return Promise.reject(error);
  }
);

export default instance;
