import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";
import { addProduct } from './../../../../features/Admin/productsSlice';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebase';
import ProductItem from './ProductItem'; 

const ProductAdd = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        brand: '',
        status: '',
        category: '',
        image: '',
        name:""
    });
    const [productItems, setProductItems] = useState([
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
    ]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProductCreated, setIsProductCreated] = useState(false); 

    useEffect(() => {
        apiClient.get('/categories/')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, name, value) => {
        const updatedItems = [...productItems];
        updatedItems[index][name] = value;
        setProductItems(updatedItems);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        toast.dismiss();
        toast.info('Uploading image...');
        setIsUploading(true);

        const storageRef = ref(storage, `product-images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                toast.dismiss();
                toast.error('Image upload failed');
                console.error(error);
                setIsUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    toast.dismiss();
                    toast.success('Image uploaded successfully');
                    setProductData(prev => ({ ...prev, image: downloadURL }));
                    setIsUploading(false);
                });
            }
        );
    };

    const addProductItem = () => {
        setProductItems(prev => [
            ...prev,
            { SKU: '', qty_in_stock: 0, price: '', color: '', size: '', product_images: { image1: { url: '' } } }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productData.image) {
            dispatch(addProduct({ productDetails: { ...productData, product_items: productItems } }))
                .unwrap(unwrapResult)
                .then(res => {
                    if (res.status) {
                        setIsProductCreated(true); 
                        setProductData({
                            title: '',
                            description: '',
                            brand: '',
                            status: '',
                            category: '',
                            image: '',
                            name:""
                        });
                        setProductItems([{
                            SKU: '',
                            qty_in_stock: 0,
                            price: '',
                            color: '',
                            size: '',
                            product_images: { image1: { url: '' } }
                        }]);
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
                        onChange={handleProductChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleProductChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleProductChange}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        {category && category.map(cat => (
                            <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleProductChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">Brand:</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleProductChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="status"
                        name="status"
                        value={productData.status}
                        onChange={handleProductChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>

                {/* Upload Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Add Product Item (only after product created) */}
                {isProductCreated && (
                    <div>
                        {productItems.map((item, index) => (
                            <ProductItem
                                key={index}
                                index={index}
                                item={item}
                                onItemChange={handleItemChange}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={addProductItem}
                            className="text-blue-500 mt-4"
                        >
                            Add Another Product Item
                        </button>
                    </div>
                )}

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded focus:outline-none"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;
