import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
        sortedProducts.map((product) => {
          const productImages = product.images; // Hình ảnh hover
          const defaultImage = product.image_url; // Hình ảnh mặc định
          return (
            <div
              className="flex flex-col w-full sm:w-[40%] lg:w-[18%] relative group border border-transparent transition duration-300"
              key={product.id}
            >
              <Link to={`/products/${product.id}`} className="relative w-full h-64 group">
                {/* Hiển thị hình ảnh mặc định */}
                <img
                  src={defaultImage}
                  alt={product.name}
                  className="absolute object-cover rounded-md z-10 w-full h-full transition-opacity duration-500 group-hover:opacity-0"
                />
                {/* Hiển thị hình ảnh khi hover */}
                {productImages.length > 0 && (
                  <img
                    src={productImages[0]}
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
