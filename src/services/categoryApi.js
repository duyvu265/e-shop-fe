import apiClient from "./apiClient";

export const fetchCategories = async (signal) => {
  const response = await apiClient.get('/categories', { signal });
  return response.data;
};

export const deleteCategoryById = async (id, signal) => {
  await apiClient.delete(`/categories/${id}`, { signal });
  return id;
};

export const updateCategoryStatusById = async (id, updateData, signal) => {
  const response = await apiClient.patch(`/categories/${id}`, updateData, { signal });
  return { id, data: response.data };
};
