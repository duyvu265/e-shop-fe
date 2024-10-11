import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// Dữ liệu giả
const mockCategories = [
  {
    id: '1',
    slug: 'category-1',
    name: 'Danh mục 1',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '2',
    slug: 'category-2',
    name: 'Danh mục 2',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '3',
    slug: 'category-3',
    name: 'Danh mục 3',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '4',
    slug: 'category-4',
    name: 'Danh mục 4',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '5',
    slug: 'category-4',
    name: 'Danh mục 4',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '6',
    slug: 'category-4',
    name: 'Danh mục 4',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '7',
    slug: 'category-4',
    name: 'Danh mục 4',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
  {
    id: '8',
    slug: 'category-4',
    name: 'Danh mục 4',
    media: {
      mainMedia: {
        image: {
          url: 'https://via.placeholder.com/300', // Đường dẫn hình ảnh giả
        },
      },
    },
  },
];

const CategoryList = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        // const response = await axios.get('/api/categories'); // Thay đổi URL thành API của bạn
        // setCats(response.data); // Giả sử dữ liệu trả về là mảng các danh mục

        // Thay thế bằng dữ liệu giả
        setCats(mockCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {cats.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item.id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <img
                src={item.media?.mainMedia?.image?.url || "/cat.png"}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
