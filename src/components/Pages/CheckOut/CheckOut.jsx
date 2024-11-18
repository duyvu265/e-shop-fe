import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaMobile } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaGift } from "react-icons/fa";

const CheckoutPage = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Vietnamese Coffee Filter",
      price: 150000,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772"
    },
    {
      id: 2,
      name: "Traditional Phở Bowl Set",
      price: 280000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "",
    discountCode: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const vietnameseCities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!formData.city) newErrors.city = "Vui lòng chọn thành phố";
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("Đặt hàng thành công!");
      } catch (error) {
        alert("Có lỗi xảy ra. Vui lòng thử lại!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = discountApplied ? subtotal * 0.1 : 0;
    return subtotal - discount;
  };

  const handleApplyDiscount = () => {
    if (formData.discountCode === "VIETNAM2024") {
      setDiscountApplied(true);
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Thanh Toán</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Đơn hàng của bạn</h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-6 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 mt-1">
                      {item.quantity} x {item.price.toLocaleString()} ₫
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <IoMdClose size={24} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between mb-4 text-lg">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">{calculateTotal().toLocaleString()} ₫</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-green-600 mb-4">
                  <span className="flex items-center"><FaGift className="mr-2" />Giảm giá:</span>
                  <span>-10%</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                <span>Tổng cộng:</span>
                <span className="text-indigo-600">{calculateTotal().toLocaleString()} ₫</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Thông tin thanh toán</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Thành phố
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                >
                  <option value="">Chọn thành phố</option>
                  {vietnameseCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phương thức thanh toán
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                    className={`p-6 border rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-lg ${formData.paymentMethod === "card" ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 hover:border-indigo-300"}`}
                  >
                    <FaCreditCard className="text-3xl mb-3 text-indigo-600" />
                    <span className="font-medium">Thẻ tín dụng</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                    className={`p-6 border rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-lg ${formData.paymentMethod === "cod" ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 hover:border-indigo-300"}`}
                  >
                    <FaMoneyBillWave className="text-3xl mb-3 text-green-600" />
                    <span className="font-medium">Tiền mặt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "mobile" })}
                    className={`p-6 border rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-lg ${formData.paymentMethod === "mobile" ? "border-indigo-500 bg-indigo-50 shadow-md" : "border-gray-200 hover:border-indigo-300"}`}
                  >
                    <FaMobile className="text-3xl mb-3 text-purple-600" />
                    <span className="font-medium">Mobile Money</span>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  name="discountCode"
                  value={formData.discountCode}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Áp dụng
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-200 text-lg font-semibold mt-6"
              >
                {isLoading ? "Đang xử lý..." : "Hoàn tất đơn hàng"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
