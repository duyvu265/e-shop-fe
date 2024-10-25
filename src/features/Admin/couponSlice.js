import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 
import apiClient from '../../services/apiClient';

export const fetchCoupon = createAsyncThunk(
    'coupon/fetchCoupon',
    async ({ signal }) => {
        const response = await axios.get(`${apiClient}/coupon?_sort=id&_order=desc`, { signal });
        return response.data; 
    }
);

export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async ({ postData }) => {
        const response = await axios.post(`${apiClient}/coupon`, postData,);
        return response.data; 
    }
);

export const updateCouponStatus = createAsyncThunk(
    'coupon/updateCouponStatus',
    async ({ id, updateData }) => {
        const response = await axios.patch(`${apiClient}/coupon/${id}`, updateData, );
        return { id, data: response.data }; 
    }
);

export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async ({ id, updateData }) => {
        const response = await axios.patch(`${apiClient}/coupon/${id}`, updateData, );
        return { id, data: response.data, status: response.status }; 
    }
);

const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        coupon: [],
        error: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoupon.fulfilled, (state, action) => {
            state.error = false;
            state.coupon = action.payload;
        });
        builder.addCase(fetchCoupon.rejected, (state, action) => {
            const error = action.error;

            if (error.name !== "AbortError") {
                state.error = error.message;
                state.coupon = [];
            }
        });
        
        builder.addCase(addCoupon.pending, () => {
            toast.dismiss();
            toast.info('Adding Coupon');
        });
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Coupon Added');
            state.coupon.unshift(action.payload);
        });
        builder.addCase(addCoupon.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });
        
        builder.addCase(updateCouponStatus.pending, () => {
            toast.dismiss();
            toast.info('Updating');
        });
        builder.addCase(updateCouponStatus.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Updated');
            const { id, data } = action.payload;
            const targetIndex = state.coupon.findIndex(coupon => coupon.id === id);
            if (targetIndex !== -1) { 
                state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data };
            }
        });
        builder.addCase(updateCouponStatus.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });

   
        builder.addCase(updateCoupon.pending, () => {
            toast.dismiss();
            toast.info('Updating');
        });
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Updated');
            const { id, data } = action.payload;
            const targetIndex = state.coupon.findIndex(coupon => coupon.id === id);
            if (targetIndex !== -1) {
                state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data };
            }
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });
    }
});

export default couponSlice.reducer; 
