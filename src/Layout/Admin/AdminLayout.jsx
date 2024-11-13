import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { memo } from 'react';


const AdminLayout = ({ activeTab, setActiveTab, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="ml-64 flex-1 min-h-screen bg-gray-100">
        <Header activeTab={activeTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(AdminLayout);
