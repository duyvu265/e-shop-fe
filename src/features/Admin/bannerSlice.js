import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from './../../services/apiClient';

export const getBanner = createAsyncThunk(
    'banner/fetchBanner',
    async ({ signal }) => {
        const response = await apiClient.get('/li-banners', { signal });
        console.log(response.data);
        return response.data;
    }
);

export const addBanner = createAsyncThunk(
    'banner/addBanner',
    async ({ bannerData }) => {
        const response = await apiClient.post('/banner/', bannerData);
        return { data: response.data, status: response.status };
    }
);

export const updateBanner = createAsyncThunk(
    'banner/updateBanner',
    async ({ id, updateData }) => {
        const response = await apiClient.patch(`/banner/${id}/`, updateData);
        return { data: response.data, id };
    }
);

export const deleteBanner = createAsyncThunk(
    'banner/deleteBanner',
    async ({ id }) => {
        await apiClient.delete(`/banner/${id}/`);
        return { id };
    }
);

const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banner: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(getBanner.fulfilled, (state, action) => {
            state.error = false;
            state.banner = action.payload;
        });
        builder.addCase(getBanner.rejected, (state, action) => {
            const error = action.error;
            if (error.name !== "AbortError") {
                state.error = error.message;
            }
        });
        builder.addCase(addBanner.pending, () => {
            toast.dismiss();
            toast.info('Uploading...');
        });
        builder.addCase(addBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Banner uploaded');
            const { data } = action.payload;
            state.banner.push(data);
        });
        builder.addCase(addBanner.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });
        builder.addCase(updateBanner.pending, () => {
            toast.dismiss();
            toast.info('Updating...');
        });
        builder.addCase(updateBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update complete');
            const { data, id } = action.payload;
            const targetIndex = state.banner.findIndex(ban => ban.id === id);
            if (targetIndex !== -1) {
                state.banner[targetIndex] = { ...state.banner[targetIndex], ...data };
            }
        });
        builder.addCase(updateBanner.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });
        builder.addCase(deleteBanner.pending, () => {
            toast.dismiss();
            toast.info('Deleting...');
        });
        builder.addCase(deleteBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Deleted');
            const { id } = action.payload;
            state.banner = state.banner.filter(ban => ban.id !== id);
        });
        builder.addCase(deleteBanner.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss();
            toast.error(error);
        });
    }
});

export default bannerSlice.reducer;
