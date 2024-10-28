import { memo } from "react";
import {
  FaFolderPlus,
  FaGift,
  FaImages,
  FaShoppingBag,
  FaTachometerAlt,
  FaTruck,
  FaUser,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dummyImage from '../../Assets/profile.png';

const Sidebar = () => {
  const { adminData } = useSelector(state => state?.adminAuth);
  return (
    <nav className="bg-gray-800 h-full flex flex-col justify-between">
      <div className="px-4 py-4">
        <div className="space-y-2">
          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/dashboard">
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/banners">
            <FaImages className="mr-2" />
            Banners
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/category">
            <FaFolderPlus className="mr-2" />
            Category
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/coupon">
            <FaGift className="mr-2" />
            Coupon
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/products">
            <FaShoppingBag className="mr-2" />
            Products
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/orders">
            <FaTruck className="mr-2" />
            Orders
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/users">
            <FaUserSecret className="mr-2" />
            Users
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/customers">
            <FaUsers className="mr-2" />
            Customers
          </NavLink>

          <NavLink className="flex items-center text-gray-200 py-2 hover:bg-gray-700 rounded-md" to="/admin/profile">
            <FaUser className="mr-2" />
            Profile
          </NavLink>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-200 px-4 py-4 flex items-center space-x-2">
        <img
          className="h-8 w-8 rounded-full"
          src={adminData.image ? adminData.image : dummyImage}
          alt=""
        />
        <span>{adminData.username}</span>
      </div>
    </nav>
  );
};

export default memo(Sidebar);
