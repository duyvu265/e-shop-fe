import DashboardStats from './DashboardStats';
import SalesOverview from './SalesOverview';
import ProductCategories from './ProductCategories';
import RecentOrders from './RecentOrders';

const Dashboard = () => {
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 7000 }
  ];

  const productData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Books", value: 200 },
    { name: "Home", value: 278 }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const recentOrders = [
    { id: "#12345", product: "iPhone 13", amount: "$999", status: "Delivered" },
    { id: "#12346", product: "MacBook Pro", amount: "$1999", status: "Processing" },
    { id: "#12347", product: "AirPods Pro", amount: "$249", status: "Pending" }
  ];

  return (
    <div>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SalesOverview data={salesData} />
        <ProductCategories data={productData} colors={COLORS} />
      </div>
      <RecentOrders orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
