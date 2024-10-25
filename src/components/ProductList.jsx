import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import apiClient from "../services/apiClient";
import { addToLikedList } from "../features/user/userSlice/UserSlice";

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useSelector((state) => state.search.query);
  const categoryId = useSelector((state) => state.category.id);
  const likedProducts = useSelector((state) => state.user.likedList) || [];
  const { isLoggedIn } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasPrev: false,
    hasNext: false,
  });

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

  const handleLikeProduct = async (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const response = await apiClient.post(`/like/`, { product_id: id });
      if (response.status === 200) {
        dispatch(addToLikedList({ id }));
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
          const productImages = product.images; // Lấy danh sách hình ảnh

          return (
            <div className="flex flex-col w-full sm:w-[40%] lg:w-[18%] relative group border border-transparent transition duration-300" key={product.id}>
              <Link to={`/products/${product.id}`} className="relative w-full h-64 group">
                {productImages.length > 0 ? (
                  <img
                    src={productImages[0]} // Hiển thị hình ảnh đầu tiên
                    alt={product.name}
                    className="absolute object-cover rounded-md z-10 w-full h-full transition-opacity duration-500 group-hover:opacity-0"
                  />
                ) : (
                  <img
                    src="/product.png" // Hình ảnh mặc định nếu không có hình
                    alt={product.name}
                    className="absolute object-cover rounded-md z-10 w-full h-full transition-opacity duration-500 group-hover:opacity-0"
                  />
                )}
                {productImages.length > 1 && (
                  <img
                    src={productImages[1]} // Hiển thị hình ảnh thứ hai nếu có
                    alt={product.name}
                    className="absolute object-cover rounded-md w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </Link>
              <div className="flex justify-between mt-4">
                <span className="font-medium">{product.name}</span>
                <span className="font-semibold">${product.price}</span>
              </div>
              <div className="text-sm text-gray-500">
                {product.description || ""}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">{product.discountCode || "Không có mã giảm giá"}</span>
                <div
                  className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max p-2 text-xs hover:bg-[#F35C7A] hover:text-white cursor-pointer"
                  onClick={() => handleLikeProduct(product.id)}
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </div>
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
