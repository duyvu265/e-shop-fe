import womanImage from '../../assets/woman.png';
import React, { Suspense, useState } from "react";
import ProductList from '../ProductList';
import Filter from '../Filter';
import Skeleton from '../Skeleton';


const ListPage = ({ searchParams }) => {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] =useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/category?slug=${searchParams.cat || 'all-products'}`);
        const category = await response.json();
        setCat(category);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams?.cat]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-#F35C7A text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <img src={womanImage} alt="" className="object-contain w-full h-full" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">{cat?.name} For You!</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={cat?._id || "00000000-0000-0000-0000-000000000001"}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;

