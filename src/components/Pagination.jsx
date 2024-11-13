import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ currentPage, hasPrev, hasNext, onPageChange }) => {
  const location = useLocation(); 
  const [searchParams, setSearchParams] = useSearchParams(); 
  const navigate = useNavigate(); 

  const createPageUrl = (pageNumber) => {
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams); 
    navigate(`${location.pathname}?${searchParams.toString()}`);
    onPageChange(pageNumber);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <button
        className="rounded-md bg-pink-600 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-pink-600 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
