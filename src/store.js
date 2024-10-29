import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/userSlice/UserSlice';
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
const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: cartSlice,
    search: SearchSlice,
    category: CategorySlice,
    adminAuth:adminAuthSlice,
    banner:bannerSlice,
    usersSlice:usersSlice,
    orders:ordersSlice,
    customersSlice:customersSlice,
    productsSlice:productsSlice,
    couponSlice:couponSlice
  },
});

export default store;
