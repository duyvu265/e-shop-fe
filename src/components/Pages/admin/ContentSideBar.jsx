import React from 'react';

function ContentSideBar() {
  return (
    <div>
      <div className="relative bg-gradient-to-b from-green-700 to-teal-400 p-5 rounded-lg shadow-md">
        <div className="flex flex-col gap-6">
          <h4 className="text-xl font-bold text-white">
            Today <br /> 5 Orders
          </h4>
          <h4 className="text-xl font-bold text-white">
            This Month <br /> 250 Orders
          </h4>
        </div>
        <img
          src="https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-indoor-plant-flowerpot-png-image_11669796.png"
          alt="plant"
          className="absolute bottom-[-50px] left-[120px] h-[300px] w-auto"
        />
      </div>
    </div>
  );
}

export default ContentSideBar;
