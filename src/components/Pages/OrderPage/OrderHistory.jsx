import { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  const ordersPerPage = 5; 
  const navigate = useNavigate();

  useEffect(() => {
    const dummyOrders = [
      {
        id: "ORD001",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 129.99 },
          { name: "Smart Watch", quantity: 1, price: 199.99 }
        ],
        total: 329.98,
        status: "delivered",
        shippingAddress: "123 Main St, City, Country",
        trackingNumber: "TRK123456789"
      },
      {
        id: "ORD002",
        date: "2024-01-10",
        items: [
          { name: "Laptop Stand", quantity: 1, price: 49.99 },
          { name: "Wireless Mouse", quantity: 1, price: 29.99 }
        ],
        total: 79.98,
        status: "shipped",
        shippingAddress: "456 Oak St, City, Country",
        trackingNumber: "TRK987654321"
      },
      {
        id: "ORD003",
        date: "2024-01-05",
        items: [
          { name: "Mechanical Keyboard", quantity: 1, price: 149.99 }
        ],
        total: 149.99,
        status: "pending",
        shippingAddress: "789 Pine St, City, Country",
        trackingNumber: "TRK456789123"
      },
      {
        id: "ORD004",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 129.99 },
          { name: "Smart Watch", quantity: 1, price: 199.99 }
        ],
        total: 329.98,
        status: "delivered",
        shippingAddress: "123 Main St, City, Country",
        trackingNumber: "TRK123456789"
      },
      {
        id: "ORD005",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 129.99 },
          { name: "Smart Watch", quantity: 1, price: 199.99 }
        ],
        total: 329.98,
        status: "delivered",
        shippingAddress: "123 Main St, City, Country",
        trackingNumber: "TRK123456789"
      },
      {
        id: "ORD006",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 129.99 },
          { name: "Smart Watch", quantity: 1, price: 199.99 }
        ],
        total: 329.98,
        status: "delivered",
        shippingAddress: "123 Main St, City, Country",
        trackingNumber: "TRK123456789"
      },
      {
        id: "ORD007",
        date: "2024-01-15",
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 129.99 },
          { name: "Smart Watch", quantity: 1, price: 199.99 }
        ],
        total: 329.98,
        status: "delivered",
        shippingAddress: "123 Main St, City, Country",
        trackingNumber: "TRK123456789"
      },
    ];
    setOrders(dummyOrders);
  }, []);

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (e, type) => {
    setDateRange(prev => ({ ...prev, [type]: e.target.value }));
    setCurrentPage(1);
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;
      const matchesDate = (!dateRange.start || order.date >= dateRange.start) &&
        (!dateRange.end || order.date <= dateRange.end);
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      const multiplier = sortConfig.direction === "asc" ? 1 : -1;
      if (sortConfig.key === "date") {
        return multiplier * (new Date(a.date) - new Date(b.date));
      }
      if (sortConfig.key === "total") {
        return multiplier * (a.total - b.total);
      }
      return multiplier * a[sortConfig.key].localeCompare(b[sortConfig.key]);
    });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search orders"
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>

          <input
            type="date"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateRange.start}
            onChange={(e) => handleDateRangeChange(e, "start")}
            aria-label="Start date"
          />
          <input
            type="date"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dateRange.end}
            onChange={(e) => handleDateRangeChange(e, "end")}
            aria-label="End date"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("id")}>
                Order ID
                <BsFilter className="inline ml-1" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}>
                Date
                <BsFilter className="inline ml-1" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("total")}>
                Total
                <BsFilter className="inline ml-1" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/order-details/${order.id}`)} 
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;