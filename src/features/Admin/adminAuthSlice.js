import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        isLogedIn: undefined,
        adminData: {},
    },
    reducers: {
        login: (state, action) => {
            const { access, refresh, userInfo } = action.payload; 
            
            state.isLogedIn = true;
            state.adminData = userInfo;            
            localStorage.setItem('accessToken', access); 
            localStorage.setItem('refreshToken', refresh);
        },

        notLogin: (state) => {
            state.isLogedIn = false;
            state.adminData = {};
        },

        logout: (state) => {
            localStorage.removeItem('adminAuthData');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.isLogedIn = false;
            state.adminData = {};
            
        },

        updateAdmin: (state, action) => {
            const { email, password } = action.payload;
            localStorage.setItem('adminAuthData', JSON.stringify({ email, password }));

            state.adminData = action.payload;
        }
    }
});

export const { login, notLogin, logout, updateAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
