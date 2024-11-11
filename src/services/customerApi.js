import apiClient from "./apiClient";
export const fetchAllCustomers = async (signal) => {
  const response = await apiClient.get('/user/li-customers', { signal });
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};

export const updateCustomerById = async (id, updateData) => {
  const response = await apiClient.patch(`/user/${id}/update/`, updateData);
  return { id, data: response.data };
};

export const deleteCustomerById = async (id) => {
  const response = await apiClient.delete(`/user/${id}/delete/`);
  if (response.status >= 200 && response.status < 300) {
    return id;
  }
  throw new Error(response.statusText);
};
