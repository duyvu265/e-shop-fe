import { useState } from 'react';
import { IoMenu, IoArrowForward } from 'react-icons/io5'; // Importing icons
import SideBar from './SiderBar';
import { CustomHeader } from './CustomHeader';
import MainContent from './MainContent';
import SideContent from './SideContent';

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-white transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } h-full sticky top-0`}
      >
        <SideBar collapsed={collapsed} /> 
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xl w-12 h-12 fixed bottom-2 left-2 p-2 hover:bg-gray-200"
        >
          {collapsed ? (
            <IoMenu size={18} />
          ) : (
            <IoArrowForward size={18} /> 
          )}
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white py-3 px-4 shadow-md">
          <CustomHeader />
        </header>
        <main className="p-5 m-6 bg-gray-100 flex gap-6">
          <MainContent />
          <SideContent />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
