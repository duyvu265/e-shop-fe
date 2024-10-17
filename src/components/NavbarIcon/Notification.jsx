import { useEffect, useState } from "react";
import axios from "axios";

function Notifications({notifications,loading}) {

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-50">
      <h2 className="font-semibold p-2 border-b">Thông báo</h2>
      <div className="max-h-60 overflow-y-auto">
        {loading ? ( 
          <p className="p-2 text-gray-500">Đang tải thông báo...</p>
        ) : notifications.length > 0 ? ( 
          notifications.map((notification) => (
            <div key={notification.id} className="p-2 border-b hover:bg-gray-100">
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        ) : (
          <p className="p-2 text-gray-500">Không có thông báo nào.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
