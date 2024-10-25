import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    id: null, 
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.id = action.payload; 
    },
    clearCategoryId: (state) => {
      state.id = null; 
    },
  },
});

export const { setCategoryId, clearCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
