// src/slices/customersSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllCustomers, getCustomerById, updateCustomerById, deleteCustomerById } from "../../services/customerApi";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async ({ signal }) => {
    try {
      return await fetchAllCustomers(signal);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  "customers/getCustomerById",
  async (id) => {
    try {
      return await getCustomerById(id);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, updateData }) => {
    try {
      return await updateCustomerById(id, updateData);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id) => {
    try {
      return await deleteCustomerById(id);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    error: false,
    customers: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.error = false;
      state.customers = action.payload;
    });
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      const error = action.error;
      if (error.name !== "AbortError") {
        state.error = error.message;
        state.customers = [];
      }
    });

    builder.addCase(updateCustomer.pending, () => {
      toast.dismiss();
      toast.info("Updating...");
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Update Complete");

      const { id, data } = action.payload;
      const targetIndex = state.customers.findIndex((customer) => customer.id === id);
      if (targetIndex !== -1) {
        state.customers[targetIndex] = { ...state.customers[targetIndex], ...data };
      }
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });

    builder.addCase(deleteCustomer.pending, () => {
      toast.dismiss();
      toast.info("Deleting...");
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Delete Success");
      const id = action.payload;
      state.customers = state.customers.filter((customer) => customer.id !== id);
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });
  },
});

export default customersSlice.reducer;
