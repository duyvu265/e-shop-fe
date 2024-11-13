import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from './../../../../features/Admin/categorySlice';
import AddLinkButton from "./AddLinkButton";
import Search from "./Search";
import CategoryTable from './../Category/CategoryTable';
import Pagination from "../../../Pagination";

const Category = () => {
  const dispatch = useDispatch();
  const { category, error } = useSelector((state) => state.category);

  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);
  const dataLimit = 4;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchCategory({ signal }));
    return () => controller.abort();
  }, [dispatch]);

  useEffect(() => {
    setCategoryData(category);
    setPage(1);
  }, [category]);

  // Pagination
  const totalData = categoryData?.length;
  const currentCategory = useMemo(() => {
    const lastIndex = page * dataLimit;
    const firstIndex = lastIndex - dataLimit;
    return categoryData?.slice(firstIndex, lastIndex);
  }, [page, categoryData]);

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredCategory = category.filter(cat => 
      cat.category.toLowerCase().includes(searchText)
    );
    setCategoryData(filteredCategory);
  };

  if (error) {
    return <div className="my-5 text-center text-3xl text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-5">
      <div className="bg-gray-100 rounded-lg shadow">
        <div className="p-4 flex justify-between items-center border-b">
          <AddLinkButton btntext="Add Category" link="/admin/category/add" />
          <Search handleSearch={handleSearch} />
        </div>
        <div className="p-4">
          {category.length ? (
            <>
              <CategoryTable currentCategory={currentCategory} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : (
            <div className="text-center text-gray-500">No categories available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
