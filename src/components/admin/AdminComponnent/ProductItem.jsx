
import React from 'react';

const ProductItem = ({ index, item, onItemChange }) => {
    const handleItemChange = (e) => {
        const { name, value, dataset } = e.target;
        const { index } = dataset;
        onItemChange(index, name, value);
    };

    return (
        <div key={index} className="mb-4">
            <div className="text-xl mb-2">Product Item {index + 1}</div>
            <div>
                <label className="block text-sm font-bold mb-2">SKU:</label>
                <input
                    type="text"
                    name="SKU"
                    value={item.SKU}
                    data-index={index}
                    onChange={handleItemChange}
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
                    onChange={handleItemChange}
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
                    onChange={handleItemChange}
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
                    onChange={handleItemChange}
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
                    onChange={handleItemChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2">Image 1:</label>
                <input
                    type="file"
                    name="product_images.image1"
                    data-index={index}
                    onChange={handleItemChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
    );
};

export default ProductItem;
