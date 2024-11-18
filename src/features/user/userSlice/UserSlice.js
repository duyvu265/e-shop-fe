import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  cart: [],
  likedList: [],
  orderHistory: [],
  notifications: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.likedList = action.payload.userInfo.liked_products || [];
      state.cart = action.payload.userInfo.cart_items || [];
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      const encryptedAccessToken = CryptoJS.AES.encrypt(action.payload.access, SECRET_KEY).toString();
      const encryptedRefreshToken = CryptoJS.AES.encrypt(action.payload.refresh, SECRET_KEY).toString();
      localStorage.setItem('accessToken', encryptedAccessToken);
      localStorage.setItem('refreshToken', encryptedRefreshToken);
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.cart = [];
      state.likedList = [];
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.qty += action.payload.qty;
      } else {
        state.cart.push({
          ...action.payload,
          qty: action.payload.qty,
        });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const existingItem = state.cart.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.qty = action.payload.qty;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.product_id !== action.payload.product_id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToLikedList: (state, action) => {
      const itemExists = state.likedList.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.likedList.push(action.payload);
      }
    },
    removeFromLikedList: (state, action) => {
      state.likedList = state.likedList.filter(item => item.id !== action.payload);
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    fetchOrderHistorySuccess: (state, action) => {
      state.orderHistory = action.payload;
    },
  },
});

const getDecryptedToken = (token) => {
  const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getAccessToken = () => {
  const encryptedAccessToken = localStorage.getItem('accessToken');
  return encryptedAccessToken ? getDecryptedToken(encryptedAccessToken) : null;
}

export const getRefreshToken = () => {
  const encryptedRefreshToken = localStorage.getItem('refreshToken');
  return encryptedRefreshToken ? getDecryptedToken(encryptedRefreshToken) : null;
}

export const {
  registerStart, registerSuccess, registerFailure,
  loginStart, loginSuccess, loginFailure, logout,
  addToCart, removeFromCart, clearCart, setCart,
  addNotification, clearNotifications, setNotifications,
  updateCartItemQuantity, addToLikedList, removeFromLikedList,
  updateUserInfo, fetchOrderHistorySuccess, setIsLoggedIn
} = userSlice.actions;

export default userSlice.reducer;
