import React from 'react';

function Banner() {
  return (
    <div className="bg-white shadow-md p-5 h-64 rounded-lg">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Create and sell products</h2>
          <p className="text-gray-500 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Aliquid aliquam!
          </p>
        </div>
        <div className="flex gap-6">
          <button className="bg-green-700 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-900 transition">
            Explore More
          </button>
          <button className="border border-gray-300 py-2 px-4 rounded-lg text-lg hover:bg-gray-100 transition">
            Top Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
