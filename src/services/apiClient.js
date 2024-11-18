import axios from 'axios';
import { logout } from '../features/user/userSlice/UserSlice';
import jwt_decode from 'jwt-decode';
const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

const refreshTokens = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const response = await axios.post(`${apiUrl}/token/refresh/`, {
        refresh: refreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { access, refresh } = response.data;
      if (access && refresh) {
        localStorage.setItem('accessToken', access);
        console.log('rf ok');
        return access;
      } else {
        console.log('Failed to refresh tokens, logging out...');
        logout();
        return null;
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error.response ? error.response.data : error);
      logout();
      return null;
    }
  } else {
    console.log('No refresh token available, logging out...');
    logout();
    return null;
  }
};

const getCSRFToken = () => {
  const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrf-token='));
  return csrfToken ? csrfToken.split('=')[1] : null;
};

apiClient.interceptors.request.use(
  async (config) => {
    try {
      let token = localStorage.getItem('accessToken');
      if (!token) {
        return config;
      }

      let decodedToken = null;
      try {
        decodedToken = jwt_decode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();  
        return config;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken && decodedToken.exp <= currentTime) {
        token = await refreshTokens();
        if (!token) {
          return config; 
        }
      }

      config.headers.Authorization = `Bearer ${token}`;

      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers['CSRFToken'] = csrfToken;  
      }
    } catch (error) {
      console.error('Error accessing localStorage or request interceptor:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default apiClient;
