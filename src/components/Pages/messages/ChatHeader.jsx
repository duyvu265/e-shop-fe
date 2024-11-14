import React from "react";
import { FaTimes } from "react-icons/fa";

const ChatHeader = ({ onlineStatus, onClose }) => (
  <div className="flex items-center justify-between px-6 py-3 border-b">
    <div className="flex items-center space-x-4 flex-grow">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <div>
        <h2 className="font-semibold">John Doe</h2>
        <p className="text-sm text-gray-500">{onlineStatus}</p>
      </div>
    </div>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
      <FaTimes />
    </button>
  </div>
);

export default ChatHeader;
