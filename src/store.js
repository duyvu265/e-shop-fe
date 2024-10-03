import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/user/userSlice/UserSlice';
import CarrSlice from './features/CartSilce/CarrSlice';


const store = configureStore({
  reducer: {
    user: UserSlice,
    cart:CarrSlice
    
  },
});

export default store;
