import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";
import { addBanner } from "../../../../features/Admin/bannerSlice";
const BannerAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bannerData, setBannerData] = useState({ title: '', status: '', image: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBannerData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    toast.dismiss();
    toast.info('Uploading image....');

    // Gửi yêu cầu tải lên hình ảnh đến server backend
    axios.post(`${apiClient}/upload-image`, formData)
      .then(res => {
        toast.dismiss();
        toast.success('Image Uploaded');
        const image = res.data.url; // Giả sử server trả về URL hình ảnh
        setBannerData(prev => ({ ...prev, image: image }));
      })
      .catch(error => {
        toast.dismiss();
        toast.error('Image not uploaded');
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bannerData.image) {
      dispatch(addBanner({ bannerData }))
        .unwrap(unwrapResult)
        .then(res => {
          if (res.status) {
            setBannerData({ title: '', status: '', image: '' });
            navigate(-1);
          }
        });
    } else {
      toast.dismiss();
      toast.error('No image found');
    }
  };

  return (
    <div className="container mx-auto max-w-lg my-5">
      <form className="shadow p-4 rounded" onSubmit={handleSubmit}>
        <h4 className="text-center mb-4">Add Banner</h4>
        
        <div className="mb-3">
          <label htmlFor="title" className="form-label font-bold">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={bannerData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label font-bold">Status:</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={bannerData.status}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Status --</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label font-bold">Image:</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>

        {bannerData.image && (
          <div className="mb-3 h-24 w-full">
            <img
              className="h-full w-full object-cover"
              src={bannerData.image}
              alt=""
            />
          </div>
        )}

        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary mb-2">Add Banner</button>
          <button
            type="button"
            className="btn btn-danger mb-2"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerAdd;
