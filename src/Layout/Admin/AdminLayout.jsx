import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className={`sb-nav-fixed ${sidebarToggle ? "sb-sidenav-toggled" : ""}`}>
      <Navbar toggle={sidebarToggle} setToggle={setSidebarToggle} />

      <div id="layoutSidenav" className="flex">
        {/* Sidebar */}
        <div
          id="layoutSidenav_nav"
          className={`flex-none transition-transform duration-150 transform ${sidebarToggle ? "translate-x-0" : "-translate-x-[225px]"} z-[1038] w-[225px] h-screen bg-gray-800`}
        >
          <Sidebar />
        </div>

        {/* Content */}
        <div
          id="layoutSidenav_content"
          className="relative flex flex-col justify-between flex-grow min-h-[calc(100vh-56px)] transition-[margin] duration-150 ease-in-out ml-[-225px]"
        >
          <main className="flex-grow">
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
