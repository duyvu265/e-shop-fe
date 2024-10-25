import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";
import axios from "axios";
import { updateProduct } from "../../../../features/Admin/productsSlice";

const ProductEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { data: category } = useFetch(`${apiClient}/category`);
    const { data: product, error, loading } = useFetch(`${apiClient}/products/${id}`);

    const initialState = { title: '', description: '', brand: '', status: '', category: '', image: '', price: '' };
    const [productData, setProductData] = useState(initialState);

    useEffect(() => {
        setProductData(prev => ({ ...prev, ...product }));
    }, [product]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        toast.dismiss();
        toast.info('Uploading image....');

        // Gửi hình ảnh đến server bằng axios
        axios.post(`${apiClient}/upload-image`, formData)
            .then(res => {
                toast.dismiss();
                toast.success('Image Uploaded');
                setProductData(prev => ({ ...prev, image: res.data.url })); // Giả sử server trả về URL hình ảnh
            })
            .catch(error => {
                toast.dismiss();
                toast.error('Image not uploaded');
                console.log(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const price = Number(productData.price);
        const updateData = { ...productData, price };

        if (productData.image) {
            dispatch(updateProduct({ id, updateData }))
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

    if (loading) {
        return <div className="my-5 text-center"></div>;
    }

    if (error) {
        return <div className="my-5 text-center text-red-500">{error}</div>;
    }

    return (
        <>
            {product && (
                <div className="container mx-auto max-w-lg my-5">
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-2xl font-bold text-center mb-4">Edit Product</h2>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                Title:
                            </label>
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
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                Description:
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                                Brand:
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="brand"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                                Price:
                            </label>
                            <input
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                                Status:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="status"
                                value={productData.status}
                                name="status"
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="hidden">Hidden</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                                Category:
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                value={productData.category}
                                name="category"
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
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                                Change Image:
                            </label>
                            <input
                                type="file"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-4">
                            {productData.image && (
                                <img
                                    className="h-32 w-32 object-cover"
                                    src={productData.image}
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ProductEdit;
