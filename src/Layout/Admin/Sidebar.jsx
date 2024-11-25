import { Link } from "react-router-dom";
import { FiGrid, FiTag, FiPackage, FiShoppingBag, FiShoppingCart, FiUsers, FiUser,FiImage      } from "react-icons/fi";
import { memo } from "react";
const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Dashboard", icon: FiGrid, path: "/admin/dashboard" },
    { name: "Banners", icon: FiImage    , path: "/admin/banners" },
    { name: "Category", icon: FiPackage, path: "/admin/category" },
    { name: "Discount", icon: FiTag, path: "/admin/discount" },
    { name: "Products", icon: FiShoppingBag, path: "/admin/products" },
    { name: "Orders", icon: FiShoppingCart, path: "/admin/orders" },
    { name: "Users", icon: FiUsers, path: "/admin/users" },
    { name: "Profile", icon: FiUser, path: "/admin/profile" },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-sm">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav className="mt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.name}
              to={tab.path}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center px-4 py-3 text-sm ${
                activeTab === tab.name
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default memo(Sidebar);
