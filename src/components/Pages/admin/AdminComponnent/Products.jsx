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

        dispatch(fetchProducts({ signal }));

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    const [productsData, setProductsData] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);
    const dataLimit = 4;
    const lastIndex = page * dataLimit;
    const firstIndex = lastIndex - dataLimit;
    const currentProducts = productsData.slice(firstIndex, lastIndex);

    useEffect(() => {
        setProductsData(products);
        setPage(1); 
    }, [products]);

    // Search function
    const handleSearch = (e) => {
        const searchText = e.target.value;
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()));
        setProductsData(filteredProducts);
        setPage(1); // Reset to the first page when searching
    };

    if (error) {
        return <div className="my-5 text-center h3">{error}</div>;
    }

    return (
        <>
            {products && (
                <div className="container mx-auto my-5 p-4 bg-white rounded shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <AddLinkButton text="Add Product" />
                        <Search placeholder="Search Products..." handleSearch={handleSearch} />
                    </div>
                    <ProductsTable products={currentProducts} />
                    <Pagination
                        currentPage={page}
                        totalCount={productsData.length}
                        dataLimit={dataLimit}
                        setCurrentPage={setPage}
                    />
                </div>
            )}
        </>
    );
};

export default Products;
