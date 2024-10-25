import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";
import { addProduct } from './../../../../features/Admin/productsSlice';

const ProductAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        brand: '',
        status: '',
        category: '',
        price: '',
        image: '',
    });
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        apiClient.get('/category/')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        toast.dismiss();
        toast.info('Uploading image...');

        setIsUploading(true);
        try {
            const response = await apiClient.post('/upload-image/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProductData(prev => ({ ...prev, image: response.data.imageUrl }));
            toast.dismiss();
            toast.success('Image Uploaded');
        } catch (error) {
            toast.dismiss();
            toast.error('Image not uploaded');
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { price, image } = productData;
        if (image) {
            dispatch(addProduct({ productDetails: { ...productData, price: Number(price) } }))
                .unwrap(unwrapResult)
                .then(res => {
                    if (res.status) {
                        setProductData(initialState);
                        navigate(-1);
                    }
                });
        } else {
            toast.dismiss();
            toast.error('No image found');
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-5">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="text-2xl text-center mb-4">Add Product</div>
                {/* Form Fields */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Category Dropdown */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {category && category.map(cat => {
                            const { category, id, status } = cat;
                            return status === "active" ? (
                                <option key={id} value={category}>{category}</option>
                            ) : null;
                        })}
                    </select>
                </div>
                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                {/* Submit Button */}
                <div className="flex justify-between">
                    <button type="submit" className={`btn btn-primary ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isUploading}>
                        {isUploading ? 'Adding...' : 'Add Product'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;
