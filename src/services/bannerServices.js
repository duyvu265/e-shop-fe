

import apiClient from "./apiClient";
export const getBanners = async (signal) => {
    const response = await apiClient.get('/banners', { signal });
    return response.data;
};


export const add_Banners = async (bannerData) => {
    const response = await apiClient.post('/banners/', bannerData);
    return response.data;
};


export const update_Banner = async (id, updateData) => {
    const response = await apiClient.patch(`/banners/${id}/status/`, updateData);
    return response.data;
};


export const get_BannerById = async (id) => {
    const response = await apiClient.get(`/banners/${id}/`);
    return response.data;
};

export const delete_Banner = async (id) => {
    const response = await apiClient.delete(`/banners/${id}/`);
    return response.data;
};
