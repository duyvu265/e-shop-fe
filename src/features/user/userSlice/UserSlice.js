import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
  cart: [],
  wishlist: [],
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
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
      state.cart = [];
      state.wishlist = [];
      state.orderHistory = [];
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
    addToWishlist: (state, action) => {
      const itemExists = state.wishlist.find(item => item.id === action.payload.id);
      if (!itemExists) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
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
  addToWishlist, removeFromWishlist,
  updateUserInfo, fetchOrderHistorySuccess,
} = userSlice.actions;

export default userSlice.reducer;
