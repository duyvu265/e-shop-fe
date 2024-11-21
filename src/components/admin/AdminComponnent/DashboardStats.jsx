import React from 'react';
import { FiDollarSign, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total Sales" value="$24,780" icon={<FiDollarSign className="h-8 w-8 text-blue-500" />} percentage="+12.5%" />
      <StatCard title="Total Orders" value="1,463" icon={<FiShoppingBag className="h-8 w-8 text-purple-500" />} percentage="+8.2%" />
      <StatCard title="Conversion Rate" value="2.4%" icon={<FiTrendingUp className="h-8 w-8 text-green-500" />} percentage="-1.8%" />
      <StatCard title="Active Customers" value="892" icon={<FiUsers className="h-8 w-8 text-yellow-500" />} percentage="+4.3%" />
    </div>
  );
};

const StatCard = ({ title, value, icon, percentage }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      {icon}
    </div>
    <div className="mt-4">
      <p className="text-green-500 text-sm">{percentage}</p>
    </div>
  </div>
);

export default DashboardStats;
