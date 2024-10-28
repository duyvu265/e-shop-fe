import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({ signal }) => {
        try {
            const response = await apiClient.get(`/orders`, { signal });
            return response.data; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ id, updateData }) => {
        try {
            const response = await apiClient.patch(`/orders/${id}`, updateData);
            return { id, data: response.data, status: response.status >= 200 && response.status < 300 }; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        error: false,
        orders: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.error = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            const error = action.error;
            state.orders = [];

            if (error.name !== 'AbortError') {
                state.error = error.message;
            }
        });
        
        builder.addCase(updateOrderStatus.pending, (state) => {
            toast.dismiss();
            toast.info('Updating');
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update Complete');
            const { id, data } = action.payload;

            const targetIndex = state.orders.findIndex(order => order.id === Number(id));
            if (targetIndex !== -1) { 
                state.orders[targetIndex] = { ...state.orders[targetIndex], ...data };
            }
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });
    }
});

export default ordersSlice.reducer;
