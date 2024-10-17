import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
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
      state.userInfo = action.payload;
      state.likedList=action.payload.liked_products ;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    addToCart: (state, action) => {
      const itemExists = state.cart.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.cart.push(action.payload);
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
  addToCart, removeFromCart, clearCart,
  addToLikedList, removeFromLikedList, 
  updateUserInfo, fetchOrderHistorySuccess,
} = userSlice.actions;

export default userSlice.reducer;

