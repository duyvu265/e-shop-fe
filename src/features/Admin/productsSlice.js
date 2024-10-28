import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ signal }) => {
        try {
            const response = await apiClient.get(`/products`, { signal });
            return response.data; 
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updateData }) => {
        try {
            const response = await apiClient.patch(`/products/${id}`, updateData);
            return { data: response.data, id, status: response.status >= 200 && response.status < 300 };
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productDetails) => {
        try {
            const response = await apiClient.post(`/products`, productDetails);
            return { data: response.data, status: response.status >= 200 && response.status < 300 };
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        try {
            const response = await apiClient.delete(`/products/${id}`);
            if (response.status >= 200 && response.status < 300) {
                return id;
            }
            throw new Error(response.statusText);
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        error: false,
        products: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.error = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            const error = action.error;
            if (error.name !== 'AbortError') {
                state.error = error.message;
            }
        });

        builder.addCase(updateProduct.pending, () => {
            toast.dismiss();
            toast.info('Updating...');
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update Complete');
            const { data, id } = action.payload;
            const targetIndex = state.products.findIndex(product => product.id === Number(id));
            if (targetIndex >= 0) {
                state.products[targetIndex] = { ...state.products[targetIndex], ...data };
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });

        builder.addCase(deleteProduct.pending, () => {
            toast.dismiss();
            toast.info('Deleting...');
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Deleted');
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });

        builder.addCase(addProduct.pending, () => {
            toast.dismiss();
            toast.info('Uploading product...');
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Product Uploaded');
            const product = action.payload.data;
            state.products.unshift(product);
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });
    }
});

export default productsSlice.reducer;
