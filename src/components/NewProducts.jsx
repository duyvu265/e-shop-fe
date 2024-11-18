import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewProducts = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/products`);
        setNewProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, [apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Sản Phẩm Mới</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(newProducts) && newProducts.length > 0 ? (
          newProducts.map((product) => {
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
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
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                    >
                      Xem Chi Tiết
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Không có sản phẩm mới.</p>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
