import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;