import React from 'react';

function Activity() {
  const data = [
    {
      name: "Order A",
      orderTime: 1,
    },
    {
      name: "Order B",
      orderTime: 2,
    },
    {
      name: "Order C",
      orderTime: 3,
    },
    {
      name: "Order D",
      orderTime: 4,
    },
    {
      name: "Order E",
      orderTime: 5,
    },
    {
      name: "Order F",
      orderTime: 6,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-5">
        <h3 className="text-xl font-bold text-green-700">Recent Activity</h3>
        <button className="text-gray-400 hover:underline">View All</button>
      </div>

      <ul className="space-y-3">
        {data.map((user) => (
          <li key={user.name} className="flex items-center gap-3">
            <img
              src=""
              alt="avatar"
              className="w-10 h-10 rounded-full bg-gray-300"
            />
            <div>
              <a href="#" className="text-lg font-medium text-blue-600 hover:underline">
                {user.name}
              </a>
              <p className="text-sm text-gray-500">Ordered a new plant</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activity;
