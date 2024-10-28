import axios from 'axios';
import { logout } from '../features/user/userSlice/UserSlice';

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
        localStorage.setItem('token', access);
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

apiClient.interceptors.request.use(
  async (config) => {
    try {
      let token = localStorage.getItem('token');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      const currentTime = new Date().getTime();

      if (!token || (tokenExpiry && currentTime >= tokenExpiry)) {
        token = await refreshTokens();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const startTokenRefreshInterval = () => {
  const minute = 1000 * 60;
  setInterval(async () => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const currentTime = new Date().getTime();
    if (tokenExpiry && currentTime >= tokenExpiry - 5000) {
      console.log("Token gần hết hạn, bắt đầu refresh...");
      await refreshTokens();
    }
  }, minute * 3); 
};

startTokenRefreshInterval();

export default apiClient;
