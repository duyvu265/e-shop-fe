import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/userSlice/UserSlice';
import chatReducer from './features/user/Chat/chatSlice';
import SearchSlice from './features/user/SearchSlice/SearchSlice';
import adminAuthSlice from './features/Admin/adminAuthSlice';
import cartSlice from './features/Admin/cartSlice';
import bannerSlice from './features/Admin/bannerSlice';
import usersSlice from './features/Admin/usersSlice';
import ordersSlice from './features/Admin/ordersSlice';
import customersSlice from './features/Admin/customersSlice';
import CategorySlice from './features/Admin/categorySlice';
import productsSlice from './features/Admin/productsSlice';
import couponSlice from './features/Admin/couponSlice';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const getDecryptedToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);    
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error decrypting token:', error);
    return null;
  }
};

const loadInitialState = () => {
  try {
    const encryptedAccessToken = localStorage.getItem('accessToken');
    const encryptedRefreshToken = localStorage.getItem('refreshToken');
    let userInfo = null;
    try {
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
      console.error('Error parsing userInfo from localStorage:', error);
    }

    return {
      user: {
        userInfo: userInfo || null,
        isLoggedIn: !!encryptedAccessToken, 
        accessToken: encryptedAccessToken ? getDecryptedToken(encryptedAccessToken) : null,
        refreshToken: encryptedRefreshToken ? getDecryptedToken(encryptedRefreshToken) : null,
        cart: userInfo?.cart_items || [], 
        likedList: userInfo?.liked_products || [], 
        loading: false,
        error: null,
      },
    };
  } catch (error) {
    console.error('Error loading initial state:', error);
    return {
      user: {
        userInfo: null,
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
        cart: [],
        likedList: [],
        loading: false,
        error: null,
      },
    };
  }
};

const preloadedState = loadInitialState();

const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: cartSlice,
    search: SearchSlice,
    category: CategorySlice,
    adminAuth: adminAuthSlice,
    banner: bannerSlice,
    usersSlice: usersSlice,
    orders: ordersSlice,
    customersSlice: customersSlice,
    productsSlice: productsSlice,
    couponSlice: couponSlice,
    chat: chatReducer,
  },
  preloadedState,
});

export default store;
