import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../features/Admin/productsSlice";
import Search from "./Search";
import ProductsTable from './../Products/ProductsTable';
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const Products = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.productsSlice);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (products.length === 0) {
            dispatch(fetchProducts({ signal }));
        }

        return () => {
            controller.abort();
        };
    }, [dispatch, products.length]);

    const [page, setPage] = useState(1);
    const dataLimit = 4;
    const lastIndex = page * dataLimit;
    const firstIndex = lastIndex - dataLimit;
    const currentProducts = products?.slice(firstIndex, lastIndex) || [];

    const handleSearch = (e) => {
        const searchText = e.target.value;
        dispatch(fetchProducts({ signal: null, searchText }));
        setPage(1);
    };

    if (error) {
        return <div className="my-5 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto my-5 p-4 bg-white rounded-lg shadow-md">
            {products && products.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <Link to="/admin/products/add"> 
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Add Product
                            </button>
                        </Link>
                        <Search placeholder="Search Products..." handleSearch={handleSearch} />
                    </div>
                    <ProductsTable products={currentProducts} />
                    <Pagination
                        currentPage={page}
                        totalCount={products?.length}
                        dataLimit={dataLimit}
                        setCurrentPage={setPage}
                    />
                </>
            ) : (
                !error && (
                    <div className="my-5 text-center text-gray-500">No products available.</div>
                )
            )}
        </div>
    );
};

export default Products;
