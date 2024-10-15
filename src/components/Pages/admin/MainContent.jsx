import Banner from "./Banner";
import ProductsList from "./ProductsList";
import SellerList from "./SellerList";

function MainContent() {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-9">
        <Banner />
        <ProductsList />
        <SellerList />
      </div>
    </div>
  );
}

export default MainContent;
