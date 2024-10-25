import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../features/Admin/useFetch";
import apiClient from "../../../../services/apiClient";


const ProductView = () => {
  const { id } = useParams();
  const {
    loading,
    error,
    data: product,
  } = useFetch(`${apiClient}/products/${id}`);

  if (loading) return <div className="my-5 text-center"></div>;

  if (error) return <div className="my-5 text-center text-lg font-semibold">{error}</div>;

  return (
    <>
      {product && (
        <div className="container mx-auto px-4 md:px-5 my-5">
          <div className="flex flex-col md:flex-row md:space-x-4 items-center">
            <div className="w-full md:w-1/2 py-5 flex justify-center" style={{ height: "450px" }}>
              <img
                className="h-full w-full object-cover mb-5 md:mb-0"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="mb-3 pt-0 pt-md-5 text-2xl font-bold">{product.title}</h1>
              <div className="text-lg">Product ID: {product.id}</div>
              <div className="text-lg">Status: {product.status}</div>
              <div className="text-lg">Price: {product.price}$</div>
              <div className="text-lg">Category: {product.category}</div>
              <div className="text-lg mb-3">Brand: {product.brand}</div>
              <p className="lead mb-2 text-gray-700">{product.description}</p>
              <Link
                className="btn border border-gray-400 text-gray-700 hover:bg-gray-200 transition-colors py-2 px-4 rounded"
                to={`/admin/products/${id}/edit`}
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
