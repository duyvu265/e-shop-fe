import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import apiClient from "../services/apiClient";
import { addToCart, addToLikedList, loginSuccess, setCart } from "../features/user/userSlice/UserSlice";

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useSelector((state) => state.search.query);
  const categoryId = useSelector((state) => state.category.id);
  const likedProducts = useSelector((state) => state.user.likedList) || [];
  const { isLoggedIn, userInfo } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasPrev: false,
    hasNext: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      const likedList = JSON.parse(localStorage.getItem("likedList"));
      dispatch(loginSuccess({
        userInfo: { ...userInfo, liked_products: likedList || [] },
        access: token,
        refresh: refreshToken
      }));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
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
        alert("Có lỗi xảy ra khi tải sản phẩm.");
      } finally {
        setLoading(false); 
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
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const response = await apiClient.post(`/cart/add/`, { product_id });
      if (response.status === 200) {
        dispatch(addToCart({
          id: product_id,
          quantity: 1,
          ...response.data
        }));
        dispatch(setCart(response.data));
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleLikeProduct = async (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const response = await apiClient.post(`/like/`, { product_id: id });
      if (response.status === 200) {
        dispatch(addToLikedList({ id, ...response.data }));
        alert("Product liked!");
      }
    } catch (error) {
      console.error("Error liking product:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
        sortedProducts.map((product) => {
          const isLiked = likedProducts.some(likedProduct => likedProduct.id === product.id);

          return (
            <div className="flex flex-col w-full sm:w-[40%] lg:w-[18%] relative" key={product.id}>
              <Link to={`/products/${product.id}`} className="relative w-full h-64">
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
                  className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white relative group"
                  onClick={() => handleAddToCart(product?.product_items[0].id)}
                >
                  Add to Cart
                  <div className="color-options hidden group-hover:block absolute bg-white border border-gray-300 p-2 rounded shadow-lg">
                    <h4 className="font-semibold">Choose a Color</h4>
                    <div className="flex">
                      <div className="w-5 h-5 rounded-full border-2 border-lightblue mr-1 bg-blue-500"></div>
                      <div className="w-5 h-5 rounded-full border-2 border-lightblue mr-1 bg-white"></div>
                    </div>
                  </div>
                  <div className="size-options hidden group-hover:block absolute bg-white border border-gray-300 p-2 rounded shadow-lg">
                    <h4 className="font-semibold">Choose a Size</h4>
                    <button className="border border-gray-300 rounded px-2 py-1 mr-1">S</button>
                    <button className="border border-gray-300 rounded px-2 py-1 bg-pink-500 text-white">M</button>
                  </div>
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
