import React from 'react';
import { IoSearchOutline, IoChatbubbleEllipsesOutline, IoNotificationsOutline, IoPersonOutline } from 'react-icons/io5';

export const CustomHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg text-gray-500">
        Welcome back, XXX
      </h3>
      
      <div className="flex items-center gap-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search in Shop..."
            className="py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <IoSearchOutline className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex items-center gap-4">
          <IoChatbubbleEllipsesOutline className="text-xl text-gray-500 cursor-pointer hover:text-green-700" />
          <IoNotificationsOutline className="text-xl text-gray-500 cursor-pointer hover:text-green-700" />
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <IoPersonOutline className="text-xl text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
