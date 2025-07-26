// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://techronyx-fullstackweb.onrender.com/api/',
  withCredentials: true, 
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
