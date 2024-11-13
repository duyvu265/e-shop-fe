import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import apiClient from '../../../../services/apiClient';
import { addProduct } from './../../../../features/Admin/productsSlice';
import ProductItem from './ProductItem';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase';

const ProductAddPage = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        brand: '',
        status: 'active',
        category: '',
        image: '',
        name: '',
    });
    const [productItems, setProductItems] = useState([
        { SKU: '', qty_in_stock: 0, price: '', color: '', size: '', product_images: { image1: { url: '' } } }
    ]);
    const [isUploading, setIsUploading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

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
                .unwrap()
                .then(res => {
                    if (res.status) {
                        toast.success('Product created successfully');
                        setProductData({
                            title: '',
                            description: '',
                            brand: '',
                            status: 'active',
                            category: '',
                            image: '',
                            name: '',
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
                })
                .catch(error => {
                    toast.error('Failed to create product');
                    console.error(error);
                });
        } else {
            toast.dismiss();
            toast.error('No image found');
        }
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (!productData.title || !productData.category || !productData.image) {
                toast.error("Please complete the product details.");
                return;
            }
        }
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    return (
        <div className="container mx-auto max-w-2xl mt-5">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="text-2xl font-semibold text-center mb-4 text-gray-700">Add New Product</div>

                {currentStep === 1 && (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title:</label>
                            <input
                                type="text"
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="title"
                                name="title"
                                value={productData.title}
                                onChange={handleProductChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name:</label>
                            <input
                                type="text"
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="name"
                                name="name"
                                value={productData.name}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category:</label>
                            <select
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="category"
                                name="category"
                                value={productData.category}
                                onChange={handleProductChange}
                                required
                            >
                                <option value="">-- Select Category --</option>
                                {category.map(cat => (
                                    <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description:</label>
                            <textarea
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-sm font-semibold text-gray-700">Brand:</label>
                            <input
                                type="text"
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="brand"
                                name="brand"
                                value={productData.brand}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-semibold text-gray-700">Status:</label>
                            <select
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">Product Image:</label>
                            <input
                                type="file"
                                className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={handleNextStep}
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <div className="text-xl font-semibold text-gray-700 mb-4">Product Variants</div>
                        {productItems.map((item, index) => (
                            <ProductItem
                                key={index}
                                index={index}
                                productItem={item}
                                handleItemChange={handleItemChange}
                            />
                        ))}

                        <div className="flex justify-between mb-4">
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded"
                                onClick={addProductItem}
                            >
                                Add Variant
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={handlePreviousStep}
                            >
                                Previous Step
                            </button>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Submit Product
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductAddPage;
