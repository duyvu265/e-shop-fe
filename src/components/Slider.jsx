import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/banners/`);
        const activeSlides = response.data.filter(slide => slide.status);
        setSlides(activeSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]); 

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden relative">
      <div
        className="w-full h-full flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            className=" from-yellow-50 to-pink-50 flex-shrink-0 w-full h-full flex flex-col gap-16 xl:flex-row"
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link to="/">
                <button className="rounded-md bg-black text-white py-3 px-4">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
              }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;