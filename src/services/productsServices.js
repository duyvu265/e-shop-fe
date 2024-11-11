import apiClient from "./apiClient";
export const fetchProductsFromAPI = async (signal) => {
    try {
        const response = await apiClient.get(`/products`, { signal });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const updateProductInAPI = async (id, updateData) => {
    try {
        const response = await apiClient.patch(`/products/${id}`, updateData);
        return { data: response.data, id, status: response.status >= 200 && response.status < 300 };
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const addProductToAPI = async (productDetails) => {
    try {
        const response = await apiClient.post(`/products/`, productDetails);
        return { data: response.data, status: response.status >= 200 && response.status < 300 };
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const deleteProductFromAPI = async (id) => {
    try {
        const response = await apiClient.delete(`/products/${id}`);
        if (response.status >= 200 && response.status < 300) {
            return id;
        }
        throw new Error(response.statusText);
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
