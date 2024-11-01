import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async ({ signal }) => {
        try {
            const response = await apiClient.get(`/user/li-customers`, { signal });
            return response.data; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const getCustomerById = createAsyncThunk(
    'customers/getCustomerById',
    async (id) => {
        try {
            const response = await apiClient.get(`/user/${id}`); 
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
            const response = await apiClient.patch(`/user/${id}/update/`, updateData); 
            return { id, data: response.data }; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (id) => {
        try {
            const response = await apiClient.delete(`/user/${id}/delete/`); 
            if (response.status >= 200 && response.status < 300) {
                return id;
            }
            throw new Error(response.statusText);
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

        builder.addCase(getCustomerById.fulfilled, (state, action) => {
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

        builder.addCase(deleteCustomer.pending, () => {
            toast.dismiss();
            toast.info('Deleting...');
        });
        builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Delete Success');
            const id = action.payload;
            state.customers = state.customers.filter(customer => customer.id !== id);
        });
        builder.addCase(deleteCustomer.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });
    }
});

export default customersSlice.reducer;
