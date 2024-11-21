import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProduct } from "../../../../features/Admin/productsSlice";
import apiClient from "../../../../services/apiClient";
const ProductEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [productData, setProductData] = useState({
        title: '', description: '', brand: '', status: '', category: '', image: '', price: ''
    });
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiClient.get(`/categories`)
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setProductLoading(true);
        apiClient.get(`/products/${id}`)
            .then(response => {
                setProductData(response.data);
                setProductLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setProductLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => {
            const updatedItems = [...(prev.product_items || [])];
            if (updatedItems[selectedItemIndex]) {
                updatedItems[selectedItemIndex] = { ...updatedItems[selectedItemIndex], [name]: value };
            }
            return { ...prev, product_items: updatedItems };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const price = Number(productData.price);
        const updateData = { ...productData, price };

        dispatch(updateProduct({ id, updateData }))
            .unwrap()
            .then(res => {
                if (res.status) {
                    setProductData({
                        title: '', description: '', brand: '', status: '', category: '', image: '', price: ''
                    });
                    navigate(-1);
                }
            })
            .catch(err => {
                toast.error('Error updating product');
            });
    };

    if (productLoading) {
        return <div className="my-5 text-center">Loading product...</div>;
    }

    if (loading) {
        return <div className="my-5 text-center">Loading categories...</div>;
    }

    if (error) {
        return <div className="my-5 text-center text-red-500">{error}</div>;
    }

    return (
        <>
            {productData && (
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
                            <label htmlFor="model-select" className="block text-gray-700 text-sm font-bold mb-2">
                                Select Model:
                            </label>
                            <select
                                id="model-select"
                                value={selectedItemIndex}
                                onChange={(e) => setSelectedItemIndex(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {productData.product_items?.map((item, index) => (
                                    <option key={item.id} value={index}>
                                        Model {index + 1} - {item.SKU}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={productData?.description || ''}
                                onChange={handleItemChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="brand" className="block text-gray-700 text-sm font-bold mb-2">
                                Brand:
                            </label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={productData?.brand || ''}
                                onChange={handleItemChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {productData.product_items && productData.product_items[selectedItemIndex] && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">
                                        Color:
                                    </label>
                                    <input
                                        type="text"
                                        id="color"
                                        name="color"
                                        value={productData.product_items[selectedItemIndex]?.color || ''}
                                        onChange={handleItemChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">
                                        Size:
                                    </label>
                                    <input
                                        type="text"
                                        id="size"
                                        name="size"
                                        value={productData.product_items[selectedItemIndex]?.size || ''}
                                        onChange={handleItemChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                                        Image URL:
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        value={productData.product_items[selectedItemIndex]?.image || ''}
                                        onChange={handleItemChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                                        Category:
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={productData.product_items[selectedItemIndex]?.category || ''}
                                        onChange={handleItemChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="is_active" className="block text-gray-700 text-sm font-bold mb-2">
                                        Active:
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        name="is_active"
                                        checked={productData.product_items[selectedItemIndex]?.is_active || false}
                                        onChange={(e) => handleItemChange({ target: { name: 'is_active', value: e.target.checked } })}
                                        className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </>
                        )}
                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ProductEdit;
