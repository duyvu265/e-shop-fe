import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/userSlice/UserSlice';
import CarrSlice from './features/user/CartSilce/CarrSlice';
import SearchSlice from './features/user/SearchSlice/SearchSlice';
import CategorySlice from './features/user/CategorySlice/CategorySlice';
import adminAuthSlice from './features/Admin/adminAuthSlice';
const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: CarrSlice,
    search: SearchSlice,
    category: CategorySlice,
    adminAuth:adminAuthSlice
  },
});

export default store;
