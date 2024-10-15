import React from 'react';
import plantData from './planData';


const ProductsList = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-green-700">
          My List
        </h3>
        <button className="text-gray-500 hover:underline">
          View All
        </button>
      </div>
      <div className="flex items-center gap-8 mt-4 flex-wrap">
        {plantData?.map((plant) => (
          <div
            key={plant?.id}
            className="border rounded-lg shadow-md hover:shadow-lg transition duration-200 p-4"
          >
            <img src={plant?.picture} alt={plant?.name} className="w-[130px] mx-auto" />
            <h4 className="mt-4 text-lg font-semibold text-center">{plant?.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
