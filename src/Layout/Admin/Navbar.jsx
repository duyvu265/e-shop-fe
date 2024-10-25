import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice/UserSlice";

const Navbar = ({ toggle, setToggle }) => {

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 h-14 flex items-center justify-between px-4">
      <Link className="text-white font-semibold" to="/admin">
        My Admin
      </Link>

      <button
        className="text-white text-lg focus:outline-none"
        id="sidebarToggle"
        onClick={handleToggle}
      >
        <FaBars />
      </button>

      {/* Search form (optional, commented out) */}
      {/* <div className="hidden md:inline-block mx-3">
        <form>
          <div className="flex">
            <input
              className="form-input rounded-l-md"
              type="text"
              placeholder="Search for..."
              aria-label="Search"
            />
            <button className="bg-blue-500 text-white px-3 rounded-r-md">
              <FaSearch />
            </button>
          </div>
        </form>
      </div> */}

      <ul className="flex items-center space-x-4">
        <li className="relative">
          <Link
            className="text-white"
            id="navbarDropdown"
            to="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUser />
          </Link>

          <ul
            className="absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-md z-10"
            aria-labelledby="navbarDropdown"
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
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar);
