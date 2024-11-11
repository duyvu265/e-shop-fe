import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addProductToAPI, deleteProductFromAPI, fetchProductsFromAPI, updateProductInAPI } from "../../services/productsServices";


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ signal }) => {
        try {
            const products = await fetchProductsFromAPI(signal);
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updateData }) => {
        try {
            const response = await updateProductInAPI(id, updateData);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productDetails) => {
        try {
            const response = await addProductToAPI(productDetails);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        try {
            const deletedProductId = await deleteProductFromAPI(id);
            return deletedProductId;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        error: false,
        products: JSON.parse(localStorage.getItem('products')) || [],
    },
    reducers: {
        setProductsToLocalStorage(state, action) {
            const products = action.payload;
            state.products = products;
            localStorage.setItem('products', JSON.stringify(products));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.error = false;
            state.products = action.payload;
            localStorage.setItem('products', JSON.stringify(action.payload));
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
                localStorage.setItem('products', JSON.stringify(state.products));
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

export const { setProductsToLocalStorage } = productsSlice.actions;
export default productsSlice.reducer;
