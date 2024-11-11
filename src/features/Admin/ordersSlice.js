import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllOrders, updateOrderStatusById } from "../../services/orderApi";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ signal }) => {
    try {
      return await fetchAllOrders(signal);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, updateData }) => {
    try {
      return await updateOrderStatusById(id, updateData);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    error: false,
    orders: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.error = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      const error = action.error;
      state.orders = [];

      if (error.name !== "AbortError") {
        state.error = error.message;
      }
    });

    builder.addCase(updateOrderStatus.pending, () => {
      toast.dismiss();
      toast.info("Updating");
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Update Complete");
      const { id, data } = action.payload;

      const targetIndex = state.orders.findIndex((order) => order.id === Number(id));
      if (targetIndex !== -1) {
        state.orders[targetIndex] = { ...state.orders[targetIndex], ...data };
      }
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });
  },
});

export default ordersSlice.reducer;
