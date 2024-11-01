import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import apiClient from "../../services/apiClient";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ signal }) => {
        try {
            const res = await apiClient.get(`/user/li-users`, { signal });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const fetchCustomers = createAsyncThunk(
    'users/fetchCustomers',
    async ({ signal }) => {
        try {
            const res = await apiClient.get(`/user/li-customers`, { signal });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData) => {
        try {
            const res = await apiClient.post(`/user/create/`, userData); 
            return { data: res.data, status: res.status >= 200 && res.status < 300 };
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, updateData }) => {
        try {
            const res = await apiClient.patch(`/user/${id}/update/`, updateData); 
            return { id, data: res.data, status: res.status >= 200 && res.status < 300 };
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        try {
            const res = await apiClient.delete(`/user/${id}/delete/`); 
            if (res.status >= 200 && res.status < 300) {
                return id;
            }
            throw new Error(res.statusText);
        } catch (error) {
            throw new Error(error.response?.data || error.message);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        customers: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.error = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            const error = action.error;
            if (error.name !== "AbortError") {
                state.error = error.message;
                state.users = [];
            }
        });

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

        builder.addCase(addUser.pending, () => {
            toast.dismiss();
            toast.info('Adding User');
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('User Added');
            const { data } = action.payload;
            state.users.unshift(data);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });

        builder.addCase(updateUser.pending, () => {
            toast.dismiss();
            toast.info('Updating...');
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update Complete');
            const { id, data } = action.payload;
            const targetIndex = state.users.findIndex(user => user.id === Number(id));
            if (targetIndex >= 0) {
                state.users[targetIndex] = { ...state.users[targetIndex], ...data };
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });

        builder.addCase(deleteUser.pending, () => {
            toast.dismiss();
            toast.info('Deleting...');
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Delete Success');
            const id = action.payload;
            state.users = state.users.filter(user => user.id !== id);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message);
        });
    }
});

export default usersSlice.reducer;
