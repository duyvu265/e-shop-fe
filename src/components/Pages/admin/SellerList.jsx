import React from 'react';

const SellerList = () => {
  const sellerData = [
    {
      title: "Top Seller",
      plantsSold: "1,200 plants sold",
      sellers: "10 Sellers",
      users: [
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg"
      ]
    },
    {
      title: "Feature Seller",
      plantsSold: "1,200 plants sold",
      sellers: "10 Sellers",
      users: [
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg",
        "https://taoanhdep.com/wp-content/uploads/2024/06/text-2-img-1.jpg"
      ]
    }
  ];

  return (
    <div className="flex justify-between gap-8">
      {sellerData.map((seller, index) => (
        <div key={index} className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-bold text-green-700">{seller.title}</h5>
            <button className="text-gray-500 hover:underline">View All</button>
          </div>
          <div className="border rounded-lg shadow-md mt-2 p-4">
            <div className="flex items-center justify-evenly">
              <div className="flex items-center">
                {seller.users.map((user, i) => (
                  <div className="relative" key={i}>
                    <img src={user} alt={`User ${i + 1}`} className="w-10 h-10 rounded-full border-2 border-white" />
                  </div>
                ))}
              </div>
              <div className="border-l border-gray-300 h-10 mx-4" />
              <div className="flex flex-col">
                <span className="text-gray-600 font-semibold">{seller.plantsSold}</span>
                <span className="text-gray-600 font-semibold">{seller.sellers}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerList;
