import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async ({ signal }) => {
        const response = await axios.get(`${apiClient}/customers?_sort=id&_order=desc`, { signal });
        return response.data; 
    }
);

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ id, updateData }) => {
        const response = await axios.patch(`${apiClient}/customers/${id}`, updateData, );
        return { id, data: response.data }; 
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
