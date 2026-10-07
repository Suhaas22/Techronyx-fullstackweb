// src/utils/axios.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/api/'
    : 'https://techronyx-fullstackweb.onrender.com/api/'
);

const axiosInstance = axios.create({
  // REACT_APP_API_URL overrides this for alternate deployments.
  baseURL: apiBaseUrl,
  // Avoid leaving submit buttons in a loading state forever when the API is offline.
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access'); // JWT access token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
