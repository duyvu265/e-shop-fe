import { useState, useEffect } from "react";

const ProductImages = ({ items = [], image_url }) => {
  const [mainImage, setMainImage] = useState(image_url || (items[0]?.product_images?.image1?.url));
  useEffect(() => {
    if (image_url) {
      setMainImage(image_url);
    } else if (items.length > 0) {
      setMainImage(items[0]?.product_images?.image1?.url);
    }
  }, [image_url, items]);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <img
          src={mainImage} 
          alt="Main Product Image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex gap-4 mt-8">
        {image_url && (
          <div
            className="w-1/4 h-32 cursor-pointer"
            onClick={() => setMainImage(image_url)}
          >
            <img
              src={image_url}
              alt="Default Product Image"
              className={`w-full h-full object-cover rounded-md ${mainImage === image_url ? "ring-2 ring-blue-500" : ""}`}
            />
          </div>
        )}
        {items.map((item, i) => (
          <div
            className={`w-1/4 h-32 cursor-pointer ${mainImage === item.product_images?.image1?.url ? "ring-2 ring-blue-500" : ""}`}
            key={item.id}
            onClick={() => setMainImage(item.product_images?.image1?.url)}
          >
            <img
              src={item.product_images?.image1?.url}
              alt={`Model ${i + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
