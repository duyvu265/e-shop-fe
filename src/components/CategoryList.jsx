import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../features/CategorySlice/CategorySlice';

const CategoryList = () => {
  const [cats, setCats] = useState([]);
  const ApiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/categories/`);
        setCats(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); 
  }, []); 

  const handleSelectCategory = (id) => {
    console.log("id", id);
    
    dispatch(setCategoryId(id)); 
  };

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {cats.map((item) => (
          <Link
            to="/list" 
            state={{ categoryId: item.id }} 
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item.id}
            onClick={() => handleSelectCategory(item.id)} 
          >
            <div className="relative bg-slate-100 w-full h-96">
              <img
                src={item.image_url || "/cat.png"} 
                alt={item.category_name} 
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.category_name} 
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
