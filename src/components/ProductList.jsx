import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const searchQuery = useSelector((state) => state.search.query);
  const categoryId = useSelector((state) => state.category.id);
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
            params: {
              search: searchQuery,
            },
          });
        } else if (categoryId) {
          response = await axios.get(`${apiUrl}/products/category`, {
            params: {
              categoryId,
            },
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

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
        sortedProducts.map((product) => (
          <Link
            to={"/" + product?.slug}
            className="w-full flex flex-col gap-4 sm:w-[40%] lg:w-[18%]"
            key={product?.id}
          >
            <div className="relative w-full h-64">
              <img
                src={product?.product_images?.image1?.url || "/product.png"}
                alt={product?.name}
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500 w-full h-full"
              />
              {product?.product_images?.image2 && (
                <img
                  src={product?.product_images?.image2?.url || "/product.png"} 
                  alt={product?.name}
                  className="absolute object-cover rounded-md w-full h-full"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product?.name}</span>
              <span className="font-semibold">${product?.price}</span>
            </div>
            <div className="text-sm text-gray-500">
              {product?.description || ""}
            </div>
            <button className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))
      ) : (
        <p>No products found.</p>
      )}
      {(searchQuery || categoryId) ? (
        <Pagination
          currentPage={pagination?.currentPage}
          hasPrev={pagination?.hasPrev}
          hasNext={pagination?.hasNext}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
