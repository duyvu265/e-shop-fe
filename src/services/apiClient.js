import axios from 'axios';
import { logout } from '../features/user/userSlice/UserSlice';
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';

const apiUrl = import.meta.env.VITE_API_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Lấy SECRET_KEY từ .env

const apiClient = axios.create({
  baseURL: apiUrl,
});

// Hàm mã hóa và lưu token vào localStorage
const saveTokens = (access, refresh) => {
  const encryptedAccessToken = CryptoJS.AES.encrypt(access, SECRET_KEY).toString();
  const encryptedRefreshToken = CryptoJS.AES.encrypt(refresh, SECRET_KEY).toString();
  localStorage.setItem('accessToken', encryptedAccessToken);
  localStorage.setItem('refreshToken', encryptedRefreshToken);
};

// Hàm giải mã token từ localStorage
const getDecryptedToken = (key) => {
  const encryptedToken = localStorage.getItem(key);
  if (!encryptedToken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken; // Trả về token đã giải mã
  } catch (error) {
    console.error(`Error decrypting token (${key}):`, error);
    return null;
  }
};

// Hàm refresh token
const refreshTokens = async () => {
  const refreshToken = getDecryptedToken('refreshToken'); // Lấy refresh token đã giải mã
  if (refreshToken) {
    try {
      const response = await axios.post(
        `${apiUrl}/token/refresh/`,
        { refresh: refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { access, refresh } = response.data;
      if (access && refresh) {
        saveTokens(access, refresh); // Lưu lại token mới (mã hóa)
        console.log('Token refreshed successfully');
        return access; // Trả về access token mới
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

// Lấy CSRF token từ cookie
const getCSRFToken = () => {
  const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrf-token='));
  return csrfToken ? csrfToken.split('=')[1] : null;
};

// Interceptor cho axios
apiClient.interceptors.request.use(
  async (config) => {
    try {
      let token = getDecryptedToken('accessToken'); // Lấy access token đã giải mã
      if (!token) {
        return config;
      }

      let decodedToken = null;
      try {
        decodedToken = jwt_decode(token); // Decode token để kiểm tra thời hạn
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();  
        return config;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken && decodedToken.exp <= currentTime) {
        token = await refreshTokens(); // Làm mới token nếu hết hạn
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
      console.error('Error in request interceptor:', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
