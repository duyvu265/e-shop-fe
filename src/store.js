import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/userSlice/UserSlice';
import CarrSlice from './features/CartSilce/CarrSlice';
import SearchSlice from './features/SearchSlice/SearchSlice';
import CategorySlice from './features/CategorySlice/CategorySlice';


const store = configureStore({
  reducer: {
    user: UserSlice,
    cart:CarrSlice,
    search: SearchSlice,
    category: CategorySlice
    
  },
});

export default store;
