import apiClient from "./apiClient";

export const fetchCoupons = async (signal) => {
  const response = await apiClient.get('/coupon', { signal });
  return response.data;
};

export const addNewCoupon = async (postData) => {
  const response = await apiClient.post('/coupon', postData);
  return response.data;
};

export const updateCouponStatusById = async (id, updateData) => {
  const response = await apiClient.patch(`/coupon/${id}`, updateData);
  return { id, data: response.data };
};

export const updateCouponById = async (id, updateData) => {
  const response = await apiClient.patch(`/coupon/${id}`, updateData);
  return { id, data: response.data, status: response.status };
};
