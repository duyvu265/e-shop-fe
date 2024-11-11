import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../../services/apiClient";

const ProductView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    apiClient.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setSelectedVariant(response.data.product_items[0]);  
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const truncateString = (str, maxLength) => {
    if (!str) return '';
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  return (
    <div className="container mx-auto px-4 md:px-8 my-5">
      <div className="flex flex-col md:flex-row md:space-x-8 items-start">
        <div className="w-full md:w-1/2 py-5 flex justify-center" style={{ height: "450px" }}>
          <img
            className="h-full w-full object-cover rounded-lg shadow-lg"
            src={selectedVariant?.product_images?.image1?.url || "/default-image.jpg"}
            alt={product?.title}
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="mb-3 text-3xl font-bold text-gray-800">{truncateString(product?.title, 10)}</h1>
          <div className="text-lg text-gray-600">Product ID: {truncateString(product?.id, 20)}</div>
          <div className="text-lg text-gray-600">Category: {truncateString(product?.category?.category_name, 20)}</div>
          <div className="text-lg text-gray-600">Brand: {truncateString(product?.brand, 20)}</div>
          <div className="text-lg text-gray-600">Description: {truncateString(product?.description, 20)}</div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Select a Variant</h2>
            <div className="flex space-x-4 mt-2">
              {product?.product_items?.map((variant) => (
                <button
                  key={variant.id}
                  className={`py-2 px-4 border rounded-lg transition duration-200 ease-in-out ${selectedVariant?.id === variant.id ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
                  onClick={() => handleVariantChange(variant)}
                >
                  {truncateString(`${variant.color} - ${variant.size}`, 20)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-lg font-semibold">
            <p>Price: <span className="text-blue-600">{selectedVariant?.price}$</span></p>
            <p>In Stock: <span className="text-green-600">{selectedVariant?.qty_in_stock}</span></p>
          </div>

          <Link
            className="mt-4 inline-block py-2 px-4 border rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-200 ease-in-out"
            to={`/admin/products/${id}/edit`}
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
