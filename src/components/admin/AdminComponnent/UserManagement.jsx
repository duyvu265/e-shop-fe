import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../Pagination";
import { fetchUsers } from "../../../features/Admin/usersSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.usersSlice?.users);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const usersPerPage = 5;
  const currentUsers = userData?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchUsers({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setUserData(users);
    } else {
      setUserData([]);
    }
  }, [users]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    const filteredUsers = users?.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setUserData(filteredUsers);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getStatusColor = (status) => {
    return status === true
      ? "bg-green-100 text-green-800" // Trạng thái 'active' khi status = true
      : "bg-red-100 text-red-800";   // Trạng thái 'inactive' khi status = false
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search users"
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name
                <BsFilter className="inline ml-1" />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
                <BsFilter className="inline ml-1" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Type
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
            {currentUsers?.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-6 py-4">
                  <img
                    src={user?.avatar || "path_to_default_avatar.jpg"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.user_type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status === true ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => navigate(`/user-details/${user.id}`)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={userData?.length}
        dataLimit={usersPerPage}
        onPageChange={handlePageChange} 
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserManagement;

