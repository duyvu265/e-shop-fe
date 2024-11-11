import apiClient from "./apiClient";


export const fetchAllUsers = async (signal) => {
    const res = await apiClient.get(`/user/li-users`, { signal });
    return res.data;
};

export const fetchAllCustomers = async (signal) => {
    const res = await apiClient.get(`/user/li-customers`, { signal });
    return res.data;
};

export const createUser = async (userData) => {
    const res = await apiClient.post(`/user/create/`, userData);
    return { data: res.data, status: res.status >= 200 && res.status < 300 };
};

export const updateUserById = async (id, updateData) => {
    const res = await apiClient.patch(`/user/${id}/update/`, updateData);
    return { id, data: res.data, status: res.status >= 200 && res.status < 300 };
};

export const deleteUserById = async (id) => {
    const res = await apiClient.delete(`/user/${id}/delete/`);
    if (res.status >= 200 && res.status < 300) {
        return id;
    }
    throw new Error(res.statusText);
};
