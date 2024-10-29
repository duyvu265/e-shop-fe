import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async ({ signal }) => {
    try {
      const response = await apiClient.get('/categories', { signal });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || error.message || "An error occurred");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { signal }) => {
    try {
      await apiClient.delete(`/categories/${id}`, { signal });
      return id;
    } catch (error) {
      throw new Error(error.response?.data || error.message || "Delete failed");
    }
  }
);

export const updateCategoryStatus = createAsyncThunk(
  "category/updateCategoryStatus",
  async ({ id, updateData }, { signal }) => {
    try {
      const response = await apiClient.patch(`/categories/${id}`, updateData, { signal });
      return { id, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data || error.message || "Update failed");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    error: false,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        const error = action.error;

        if (error.name !== "AbortError") {
          state.error = error.message || "Fetch failed";
          state.category = [];
        }
      })

      .addCase(updateCategoryStatus.pending, (state) => {
        toast.dismiss();
        toast.info("Updating...");
        state.loading = true;
      })
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        toast.dismiss();
        toast.success("Update success");
        state.loading = false;

        const { id, data } = action.payload;
        const targetIndex = state.category.findIndex(
          (category) => category.id === id
        );

        if (targetIndex !== -1) {
          state.category[targetIndex] = { ...state.category[targetIndex], ...data };
        }
      })
      .addCase(updateCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        const error = action.error;
        toast.dismiss();
        toast.error(error.message || "Update failed");
      })

      .addCase(deleteCategory.pending, (state) => {
        toast.dismiss();
        toast.info("Deleting...");
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        toast.dismiss();
        toast.success("Deleted");
        state.loading = false;

        state.category = state.category.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        const error = action.error;
        toast.dismiss();
        toast.error(error.message || "Delete failed");
      });
  },
  reducers: {},
});

export default categorySlice.reducer;
