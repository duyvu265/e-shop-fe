import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../features/Admin/productsSlice";
import AddLinkButton from "./AddLinkButton";
import Search from "./Search";
import ProductsTable from './../Products/ProductsTable';
import Pagination from "../../../Pagination";

const Products = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.productsSlice);
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if (products.length===0) {
            dispatch(fetchProducts({ signal }));
        }

        return () => {
            controller.abort();
        };
    }, [dispatch, products.length,]);
    const [page, setPage] = useState(1);
    const dataLimit = 4;
    const lastIndex = page * dataLimit;
    const firstIndex = lastIndex - dataLimit;
    const currentProducts = products?.slice(firstIndex, lastIndex) || [];

    const handleSearch = (e) => {
        const searchText = e.target.value;
        // Filter products based on the search query
        dispatch(fetchProducts({ signal: null, searchText }));
        setPage(1);
    };

    if (error) {
        return <div className="my-5 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto my-5 p-4 bg-white rounded-lg shadow-md">
            {products && (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <AddLinkButton link={"/admin/products/add"} btntext="Add Product" />
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
            )}
            {!products && !error && (
                <div className="my-5 text-center text-gray-500">No products available.</div>
            )}
        </div>
    );
};

export default Products;
