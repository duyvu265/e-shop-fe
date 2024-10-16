import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const PRODUCT_PER_PAGE = 8;

const ProductList = ({ categoryId, limit, searchParams }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasPrev: false,
    hasNext: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/`);
        console.log("response", response);
        setProducts(response?.data);
        setPagination({
          currentPage: response?.data?.currentPage,
          hasPrev: response?.data?.hasPrev,
          hasNext: response?.data?.hasNext,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId, limit, searchParams, apiUrl]);

  useEffect(() => {
    const sortProducts = (products) => {
      return products.sort((a, b) => a.price - b.price);
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
            key={product?._id}
          >
            <div className="relative w-full h-64">
              <img
                src={product?.media?.mainMedia?.image?.url || "/product.png"}
                alt={product?.name}
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500 w-full h-full"
              />
              {product?.media?.items && (
                <img
                  src={product?.media?.items[0]?.image?.url || "/product.png"} 
                  alt={product?.name}
                  className="absolute object-cover rounded-md w-full h-full"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product?.name}</span>
              <span className="font-semibold">${product?.price}</span>
            </div>
            {product?.additionalInfoSections && (
              <div className="text-sm text-gray-500">
                {product?.additionalInfoSections.find(
                  (section) => section.title === "shortDesc"
                )?.description || ""}
              </div>
            )}
            <button className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white">
              Add to Cart
            </button>
          </Link>
        ))
      ) : (
        <p>No products found.</p>
      )}
      {searchParams?.cat || searchParams?.name ? (
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
