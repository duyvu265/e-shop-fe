import { createSlice } from '@reduxjs/toolkit';

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
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
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
        existingItem.quantity += action.payload.quantity; 
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
    },
    
    updateCartItemQuantity: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
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

export const {
  registerStart, registerSuccess, registerFailure,
  loginStart, loginSuccess, loginFailure, logout,
  addToCart, removeFromCart, clearCart, setCart,
  addNotification, clearNotifications, setNotifications, 
  updateCartItemQuantity, addToLikedList, removeFromLikedList,
  updateUserInfo, fetchOrderHistorySuccess,
} = userSlice.actions;

export default userSlice.reducer;
