import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        isLogedIn: undefined,
        adminData: {},
    },
    reducers: {
        login: (state, action) => {
            const { access, refresh, userInfo } = action.payload;
            const encryptedAccessToken = CryptoJS.AES.encrypt(access, SECRET_KEY).toString();
            const encryptedRefreshToken = CryptoJS.AES.encrypt(refresh, SECRET_KEY).toString();
            
            state.isLogedIn = true;
            state.adminData = userInfo;

            localStorage.setItem('accessToken', encryptedAccessToken);
            localStorage.setItem('refreshToken', encryptedRefreshToken);
        },

        notLogin: (state) => {
            state.isLogedIn = false;
            state.adminData = {};
        },

        logout: (state) => {
            localStorage.removeItem('adminAuthData');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
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


const getDecryptedToken = (token) => {
    const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}


export const getAccessToken = () => {
    const encryptedAccessToken = localStorage.getItem('accessToken');
    return encryptedAccessToken ? getDecryptedToken(encryptedAccessToken) : null;
}

export const getRefreshToken = () => {
    const encryptedRefreshToken = localStorage.getItem('refreshToken');
    return encryptedRefreshToken ? getDecryptedToken(encryptedRefreshToken) : null;
}

export const { login, notLogin, logout, updateAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
