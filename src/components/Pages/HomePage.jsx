
import Slider from './../Slider';
import CategoryList from './../CategoryList';
import NewProducts from '../NewProducts';
import DiscountCodesSection from '../DiscountCode/DistCountCode';
import ProductList from '../ProductList';
const HomePage = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-br ">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12"> Categories </h1>
        <CategoryList />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <NewProducts />
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl"> Discount Codes  </h1>
        <DiscountCodesSection />
      </div>


      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
