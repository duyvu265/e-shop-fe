import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async ({ signal }) => {
        try {
            const response = await apiClient.get(`/customers`, { signal });
            return response.data; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, updateData }) => {
        try {
            const response = await apiClient.patch(`/customers/${id}`, updateData);
            return { id, data: response.data }; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

const customersSlice = createSlice({
    name: 'customers',
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
            if (error.name !== 'AbortError') {
                state.error = error.message;
                state.customers = [];
            }
        });

        builder.addCase(updateCustomer.pending, () => {
            toast.dismiss();
            toast.info('Updating...');
        });
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update Complete');

            const { id, data } = action.payload;
            const targetIndex = state.customers.findIndex(customer => customer.id === id);
            if (targetIndex !== -1) {
                state.customers[targetIndex] = { ...state.customers[targetIndex], ...data };
            }
        });
        builder.addCase(updateCustomer.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });
    }
});

export default customersSlice.reducer;
