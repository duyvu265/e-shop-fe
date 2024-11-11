import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
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
        image: '',
        product_items: [
            {
                SKU: '',
                qty_in_stock: 0,
                price: '',
                color: '',
                size: '',
                product_images: {
                    image1: { url: '' }
                }
            }
        ]
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        apiClient.get('/categories/')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        const { index } = dataset;

        if (index !== undefined) {
            const updatedItems = [...productData.product_items];
            updatedItems[index][name] = value;
            setProductData(prev => ({ ...prev, product_items: updatedItems }));
        } else {
            setProductData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = async (e, index) => {
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

            const updatedItems = [...productData.product_items];
            updatedItems[index].product_images.image1.url = response.data.imageUrl;
            setProductData(prev => ({ ...prev, product_items: updatedItems }));

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

    const addProductItem = () => {
        setProductData(prev => ({
            ...prev,
            product_items: [...prev.product_items, { SKU: '', qty_in_stock: 0, price: '', color: '', size: '', product_images: { image1: { url: '' } } }]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { image } = productData;
        if (image) {
            dispatch(addProduct({ productDetails: productData }))
                .unwrap(unwrapResult)
                .then(res => {
                    if (res.status) {
                        setProductData({
                            title: '',
                            description: '',
                            brand: '',
                            status: '',
                            category: '',
                            image: '',
                            product_items: [
                                { SKU: '', qty_in_stock: 0, price: '', color: '', size: '', product_images: { image1: { url: '' } } }
                            ]
                        });
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
                            return (
                                <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                            );
                        })}
                    </select>
                </div>
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

                <div>
                    {productData.product_items.map((item, index) => (
                        <div key={index} className="mb-4">
                            <div className="text-xl mb-2">Product Item {index + 1}</div>
                            <div>
                                <label className="block text-sm font-bold mb-2">SKU:</label>
                                <input
                                    type="text"
                                    name="SKU"
                                    value={item.SKU}
                                    data-index={index}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={item.price}
                                    data-index={index}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Quantity:</label>
                                <input
                                    type="number"
                                    name="qty_in_stock"
                                    value={item.qty_in_stock}
                                    data-index={index}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Color:</label>
                                <input
                                    type="text"
                                    name="color"
                                    value={item.color}
                                    data-index={index}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Size:</label>
                                <input
                                    type="text"
                                    name="size"
                                    value={item.size}
                                    data-index={index}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Image for this item:</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addProductItem} className="bg-blue-500 text-white py-2 px-4 rounded">Add Product Item</button>
                </div>
                <div className="mt-6 text-center">
                    <button type="submit" disabled={isUploading} className="bg-blue-500 text-white py-2 px-4 rounded">
                        {isUploading ? "Uploading..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;
