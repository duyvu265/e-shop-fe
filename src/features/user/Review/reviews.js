import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReviewsByProductId ,addReviewToProduct,updateReview,deleteReview} from '../../../services/reviewsApi';

export const getReviews = createAsyncThunk('reviews/getReviews', async (productId, { signal }) => {
  const reviews = await fetchReviewsByProductId(productId, signal);
  return reviews;
});

export const addReview = createAsyncThunk('reviews/addReview', async ({ productId, reviewData }) => {
  const newReview = await addReviewToProduct(productId, reviewData);
  return newReview;
});

export const updateReviewAction = createAsyncThunk('reviews/updateReview', async ({ reviewId, reviewData }) => {
  const updatedReview = await updateReview(reviewId, reviewData);
  return updatedReview;
});

export const deleteReviewAction = createAsyncThunk('reviews/deleteReview', async ({ reviewId }) => {
  const deletedReviewId = await deleteReview(reviewId);
  return deletedReviewId;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateReviewAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReviewAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.reviews.findIndex((review) => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReviewAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteReviewAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReviewAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      })
      .addCase(deleteReviewAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
