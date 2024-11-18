import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = useSelector((state) => state.search.query);
  const categoryId = useSelector((state) => state.category.id);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Danh Sách Sản Phẩm</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
          sortedProducts.map((product) => {
            const productImages = product.images;
            const defaultImage = product.image_url;
            return (
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-transform hover:scale-105 hover:shadow-xl"
                key={product.id}
              >
                <Link to={`/products/${product.id}`} className="relative group">
                  <img
                    src={defaultImage}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-opacity group-hover:opacity-90"
                    loading="lazy"
                  />
                  {productImages.length > 0 && (
                    <img
                      src={productImages[0]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity group-hover:opacity-100"
                      loading="lazy"
                    />
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {product.title || "Không có mô tả"}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-red-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>
                    <Link
                      to={`/products/${product.id}`}
                      className="px-4 py-2 bg-[#ef4444] text-white rounded-lg hover:bg-[#dc2626] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:ring-offset-2"
                    >
                      Xem Chi Tiết
                    </Link>
                  </div>
                </div>
              </div>


            );
          })
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
      <div className="text-center my-8">
        <Link
          to="/products"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
        >
          Xem Tất Cả Sản Phẩm
        </Link>
      </div>

      {(searchQuery || categoryId) && (
        <Pagination
          currentPage={pagination.currentPage}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
        />
      )}
    </div>
  );
};

export default ProductList;
