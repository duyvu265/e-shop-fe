import { useState } from "react";

const ProductImages = ({ items }) => {
  const [index, setIndex] = useState(0);
  
  return (
    <div className="">
      <div className="h-[500px] relative">
        <img
          src={items[index]} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item, i) => (
          <div
            className="w-1/4 h-32 relative mt-8 cursor-pointer"
            key={i} 
            onClick={() => setIndex(i)} 
          >
            <img
              src={item} 
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
