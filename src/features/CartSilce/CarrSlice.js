import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isLoading: true,
  counter: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      state.counter = action.payload?.lineItems.length || 0;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setCart } = cartSlice.actions;
export default cartSlice.reducer;
