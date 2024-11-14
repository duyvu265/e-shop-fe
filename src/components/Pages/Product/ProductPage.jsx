import { useEffect, useState } from "react";
import CustomizeProducts from './CustomizeProducts';
import Add from "./Add";
import Reviews from './Reviews';
import ProductImages from "./ProductImages";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/${id}/`);
        const fetchedProduct = response.data;

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, apiUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const minPrice = Math.min(...product.product_items.map(item => parseFloat(item.price))).toFixed(2);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product?.product_items?.map(item => item?.product_images?.image1?.url)} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <h2 className="font-medium text-2xl">${minPrice}</h2>
        <div className="h-[2px] bg-gray-100" />
        {product.product_items.length > 0 ? (
          <CustomizeProducts
            productId={product.id}
            product_items={product.product_items}
          />
        ) : (
          <Add
            productId={product.id} 
            variantId={null} 
            stockNumber={0} 
          />
        )}
        <div className="h-[2px] bg-gray-100" />
        <h1 className="text-2xl">User Reviews</h1>
        <Reviews productId={product.id} />
      </div>
    </div>
  );
};

export default ProductPage;
