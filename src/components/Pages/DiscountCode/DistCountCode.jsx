import React, { useState } from "react";
import { FiSearch, FiCopy } from "react-icons/fi";
import { FaPercent, FaShippingFast, FaGift, FaMoon } from "react-icons/fa";

const DiscountCodesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [copyMessage, setCopyMessage] = useState("");

  const discountCodes = [
    {
      id: 1,
      code: "TET2024",
      title: "Khuyến Mãi Tết",
      description: "Giảm 25% cho tất cả các mặt hàng Tết",
      category: "percentage",
      discount: 25,
      expiryDate: "2024-02-10"
    },
    {
      id: 2,
      code: "FREESHIP100K",
      title: "Miễn Phí Vận Chuyển",
      description: "Miễn phí vận chuyển cho đơn hàng trên 100.000đ",
      category: "shipping",
      discount: 0,
      expiryDate: "2024-12-31"
    },
    {
      id: 3,
      code: "TRUNGTHUNEW",
      title: "Khuyến Mãi Trung Thu",
      description: "Giảm 40% cho bộ sưu tập Trung Thu",
      category: "holiday",
      discount: 40,
      expiryDate: "2024-09-25"
    },
    {
      id: 4,
      code: "CHAOHE2024",
      title: "Ưu Đãi Mùa Hè",
      description: "Giảm 30% cho tất cả sản phẩm mùa hè",
      category: "percentage",
      discount: 30,
      expiryDate: "2024-08-31"
    }
  ];

  const categories = [
    { id: "all", name: "Tất Cả Mã", icon: null },
    { id: "percentage", name: "Giảm Giá", icon: FaPercent },
    { id: "shipping", name: "Miễn Phí Ship", icon: FaShippingFast },
    { id: "holiday", name: "Khuyến Mãi Lễ", icon: FaGift },
    { id: "lunar", name: "Tết", icon: FaMoon }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopyMessage("Đã sao chép mã!");
        setTimeout(() => setCopyMessage(""), 3000);
      })
      .catch(() => {
        setCopyMessage("Không thể sao chép mã");
        setTimeout(() => setCopyMessage(""), 3000);
      });
  };

  const filteredCodes = discountCodes
    .filter(code => 
      (selectedCategory === "all" || code.category === selectedCategory) &&
      (code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
       code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       code.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === "discount") {
        return b.discount - a.discount;
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-br ">
      {copyMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {copyMessage}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-4xl font-bold text-red-800 mb-4 text-center">Mã Giảm Giá Hấp Dẫn</h2>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mã giảm giá..."
              className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm mã giảm giá"
            />
          </div>

          <select
            className="w-full md:w-48 px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sắp xếp mã giảm giá"
          >
            <option value="default">Sắp xếp</option>
            <option value="discount">Giảm giá cao nhất</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full ${selectedCategory === category.id ? "bg-red-500 text-white" : "bg-red-100 text-red-700"} transition-colors duration-200 hover:shadow-md`}
              aria-pressed={selectedCategory === category.id}
            >
              {category.icon && <category.icon className="mr-2" />}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCodes.length > 0 ? (
          filteredCodes.map(code => (
            <div
              key={code.id}
              className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200 border-2 border-red-100"
              role="article"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-red-800">{code.title}</h3>
                  <p className="text-gray-600 mt-1">{code.description}</p>
                </div>
                {code.category === "percentage" && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full animate-pulse">
                    -{code.discount}%
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between bg-red-50 rounded-lg p-3">
                <code className="text-lg font-mono font-semibold text-red-600">{code.code}</code>
                <button
                  onClick={() => handleCopyCode(code.code)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  aria-label={`Sao chép mã ${code.code}`}
                >
                  <FiCopy />
                  Sao Chép
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Hết hạn: {new Date(code.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không tìm thấy mã giảm giá phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCodesSection;
