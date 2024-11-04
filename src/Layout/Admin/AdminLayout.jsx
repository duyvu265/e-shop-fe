import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  console.log("ok ")
  return (
    <div className={`relative h-screen ${sidebarToggle ? "translate-x-0" : ""}`}>
      <Navbar toggle={sidebarToggle} setToggle={setSidebarToggle} />

      <div id="layoutSidenav" className="flex h-full">
        <div
          id="layoutSidenav_nav"
          className={`flex-none transition-transform duration-150 transform ${sidebarToggle ? "translate-x-0" : "-translate-x-[225px]"} z-[1038] w-[225px] h-full bg-gray-800`}
        >
          <Sidebar />
        </div>
        <div
          id="layoutSidenav_content"
          className="relative flex flex-col justify-between flex-grow h-full transition-[margin] duration-150 ease-in-out"
          style={{ width: `calc(100vw - ${sidebarToggle ? '270px' : '270px'})` }}
        >
          <main className="flex-grow">
            <div className="px-4 h-full w-full">
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
