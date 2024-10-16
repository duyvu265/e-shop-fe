import  { useState } from "react";


const ProductImages = () => {
  const [index, setIndex] = useState(0);
  const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
];
  return (
    <div className="">
      <div className="h-[500px] relative">
        <img
          src={images[index]?.image?.url}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((item, i) => (
          <div
            className="w-1/4 h-32 relative mt-8 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
          >
            <img
              src={item.image?.url}
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
