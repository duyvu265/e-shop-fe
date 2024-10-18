import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import apiClient from "../services/apiClient";

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const searchQuery = useSelector((state) => state.search.query);
  const categoryId = useSelector((state) => state.category.id);
  const likedProducts = useSelector((state) => state.user.likedList) || [];

  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasPrev: false,
    hasNext: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;

        if (searchQuery) {
          response = await axios.get(`${apiUrl}/products/search`, {
            params: { search: searchQuery },
          });
        } else if (categoryId) {
          response = await axios.get(`${apiUrl}/products/category`, {
            params: { categoryId },
          });
        } else {
          response = await axios.get(`${apiUrl}/products/`);
        }

        setProducts(response?.data || []);
        setPagination({
          currentPage: response?.data.currentPage || 0,
          hasPrev: response?.data.hasPrev || false,
          hasNext: response?.data.hasNext || false,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId, searchQuery, apiUrl]);

  useEffect(() => {
    const sortProducts = (products) => {
      return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    };

    setSortedProducts(sortProducts([...products]));
  }, [products]);

  const handleAddToCart = async (product_id) => {
    try {
      await apiClient.post(`/cart/add/`, { product_id: product_id });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleLikeProduct = async (id) => {
    try {
      await axios.post(`${apiClient}/like/`, { product_id: id });
      alert("Product liked!");
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
        sortedProducts.map((product) => {
          const isLiked = likedProducts.some(likedProduct => likedProduct.id === product.id);

          return (
            <div className="flex flex-col w-full sm:w-[40%] lg:w-[18%]" key={product.id}>
              <Link to={"/" + product.slug} className="relative w-full h-64">
                <img
                  src={product.product_items[0]?.product_images?.image1?.url || "/product.png"}
                  alt={product.name}
                  className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500 w-full h-full"
                />
                {product.product_items[0]?.product_images?.image2 && (
                  <img
                    src={product.product_items[0]?.product_images.image2.url || "/product.png"}
                    alt={product.name}
                    className="absolute object-cover rounded-md w-full h-full"
                  />
                )}
              </Link>
              <div className="flex justify-between mt-4">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">${product.product_items[0]?.price}</span>
              </div>
              <div className="text-sm text-gray-500">
                {product.description || ""}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>SKU: {product.product_items[0]?.SKU || "N/A"}</p>
                <p>Quantity in Stock: {product.product_items[0]?.qty_in_stock || "N/A"}</p>
                <p>Color: {product.product_items[0]?.color || "N/A"}</p>
                <p>Size: {product.product_items[0]?.size || "N/A"}</p>
              </div>
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white"
                  onClick={() => handleAddToCart(product.product_items[0].id)}
                >
                  Add to Cart
                </button>
                <button
                  className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white"
                  onClick={() => handleLikeProduct(product.id)}
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No products found.</p>
      )}
      {(searchQuery || categoryId) ? (
        <Pagination
          currentPage={pagination.currentPage}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
