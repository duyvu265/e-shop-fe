import apiClient from "./apiClient";
export const fetchAllOrders = async (signal) => {
  const response = await apiClient.get('/orders', { signal });
  return response.data;
};

export const updateOrderStatusById = async (id, updateData) => {
  const response = await apiClient.patch(`/orders/${id}`, updateData);
  return { id, data: response.data, status: response.status >= 200 && response.status < 300 };
};
