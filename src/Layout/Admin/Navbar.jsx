import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice/UserSlice";

const Navbar = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái cho dropdown

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Đóng/mở dropdown
  };

  return (
    <nav className="bg-gray-800 h-14 flex items-center justify-between px-4 w-100vh">
      <div className="flex items-center">
        <Link className="text-white font-semibold" to="/admin">
          My Admin
        </Link>

        <span
          className="text-white text-lg cursor-pointer ml-2"
          onClick={handleToggle}
        >
          <FaBars />
        </span>
      </div>

      <ul className="flex items-center space-x-4">
        <li className="relative">
          <span
            className="text-white cursor-pointer"
            onClick={toggleDropdown} // Gọi hàm toggleDropdown khi nhấp
          >
            <FaUser />
          </span>

          {isDropdownOpen && ( // Hiển thị dropdown nếu isDropdownOpen là true
            <ul
              className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-md z-10"
            >
              <li>
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/admin/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="block px-4 py-2 hover:bg-gray-100" to="/admin/profile/edit">
                  Edit Profile
                </Link>
              </li>
              <li>
                <hr className="my-2 border-gray-300" />
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar);
