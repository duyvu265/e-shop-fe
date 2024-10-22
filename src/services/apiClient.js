import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
