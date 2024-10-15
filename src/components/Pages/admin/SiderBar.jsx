import { FaLeaf } from 'react-icons/fa';
import { IoPersonOutline, IoList, IoLogOutOutline, IoCheckboxOutline, IoSettingsOutline } from 'react-icons/io5';

function SideBar({ collapsed }) { 
  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="flex items-center justify-center mb-6">
        <div className="text-3xl text-green-600">
          <FaLeaf />
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {[
            { key: '1', icon: <IoPersonOutline />, label: 'Dashboard' },
            { key: '2', icon: <IoList />, label: 'List Users' },
            { key: '3', icon: <IoLogOutOutline />, label: 'Logout' },
            { key: '4', icon: <IoCheckboxOutline />, label: 'To Do' },
            { key: '5', icon: <IoList />, label: 'My Orders' },
            { key: '6', icon: <IoSettingsOutline />, label: 'Setting' },
          ].map((item) => (
            <li key={item.key}>
              <button className="flex items-center p-2 w-full text-left text-gray-700 hover:bg-gray-200 rounded transition duration-200">
                <span className="mr-2">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>} 
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
