import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchCoupons, addNewCoupon, updateCouponStatusById, updateCouponById } from "../../services/couponApi";

export const fetchCoupon = createAsyncThunk(
  "coupon/fetchCoupon",
  async ({ signal }) => {
    try {
      return await fetchCoupons(signal);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const addCoupon = createAsyncThunk(
  "coupon/addCoupon",
  async ({ postData }) => {
    try {
      return await addNewCoupon(postData);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const updateCouponStatus = createAsyncThunk(
  "coupon/updateCouponStatus",
  async ({ id, updateData }) => {
    try {
      return await updateCouponStatusById(id, updateData);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ id, updateData }) => {
    try {
      return await updateCouponById(id, updateData);
    } catch (error) {
      throw new Error(error.response?.data || error.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.error = false;
      state.coupon = action.payload;
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      const error = action.error;
      if (error.name !== "AbortError") {
        state.error = error.message;
        state.coupon = [];
      }
    });

    builder.addCase(addCoupon.pending, () => {
      toast.dismiss();
      toast.info("Adding Coupon");
    });
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Coupon Added");
      state.coupon.unshift(action.payload);
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      const error = action.error.message;
      toast.dismiss();
      toast.error(error);
    });

    builder.addCase(updateCouponStatus.pending, () => {
      toast.dismiss();
      toast.info("Updating");
    });
    builder.addCase(updateCouponStatus.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Updated");
      const { id, data } = action.payload;
      const targetIndex = state.coupon.findIndex((coupon) => coupon.id === id);
      if (targetIndex !== -1) {
        state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data };
      }
    });
    builder.addCase(updateCouponStatus.rejected, (state, action) => {
      const error = action.error.message;
      toast.dismiss();
      toast.error(error);
    });

    builder.addCase(updateCoupon.pending, () => {
      toast.dismiss();
      toast.info("Updating");
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("Updated");
      const { id, data } = action.payload;
      const targetIndex = state.coupon.findIndex((coupon) => coupon.id === id);
      if (targetIndex !== -1) {
        state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data };
      }
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {
      const error = action.error.message;
      toast.dismiss();
      toast.error(error);
    });
  },
});

export default couponSlice.reducer;
