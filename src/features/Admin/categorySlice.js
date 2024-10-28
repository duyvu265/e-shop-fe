import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import apiClient from "../../services/apiClient";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async ({ signal }) => {
    const response = await axios.get(`${apiClient}/category`, { signal });
    return response.data; 
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const response = await axios.delete(`${apiClient}/category/${id}`, );
    return id; 
  }
);

export const updateCategoryStatus = createAsyncThunk(
  "category/updateCategoryStatus",
  async ({ id, updateData }) => {
    const response = await axios.patch(`${apiClient}/category/${id}`, updateData,);
    return { id, data: response.data }; 
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.error = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      const error = action.error;

      if (error.name !== "AbortError") {
        state.error = error.message;
        state.category = [];
      }
    });

    builder.addCase(updateCategoryStatus.pending, () => {
      toast.dismiss();
      toast.info("Updating...");
    });
    builder.addCase(updateCategoryStatus.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Update success");

      const { id, data } = action.payload;
      const targetIndex = state.category.findIndex(
        (category) => category.id === id
      );

      if (targetIndex !== -1) {
        state.category[targetIndex] = { ...state.category[targetIndex], ...data };
      }
    });
    builder.addCase(updateCategoryStatus.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });

    builder.addCase(deleteCategory.pending, () => {
      toast.dismiss();
      toast.info("Deleting...");
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Deleted");

      state.category = state.category.filter(
        (category) => category.id !== action.payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });
  },
  reducers: {},
});

export default categorySlice.reducer;
