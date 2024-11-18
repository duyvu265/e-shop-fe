import axios from 'axios';
import apiClient from './apiClient';  
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchReviewsByProductId = async (productId, signal) => {
  const response = await axios.get(`${apiUrl}/reviews/product/${productId}/`, { signal });
  return response.data;  
};

export const addReviewToProduct = async (productId, reviewData) => {
  console.log(reviewData);
  const response = await apiClient.post(`/reviews/product/${productId}/add/`, reviewData,);
  return response.data;  
};

export const updateReview = async (reviewId, reviewData) => {
  const response = await apiClient.put(`/reviews/${reviewId}/update/`, reviewData);
  return response.data;  
};

export const deleteReview = async (reviewId) => {
  await apiClient.delete(`/reviews/${reviewId}/delete/`,);
  return reviewId;  
};
