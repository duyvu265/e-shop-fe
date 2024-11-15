// ShippingForm.js
const ShippingForm = ({ shippingInfo, handleInputChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông Tin Giao Hàng</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ Tên</label>
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thành Phố</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.city ? "border-red-500" : ""}`}
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mã Bưu Điện</label>
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.zipCode ? "border-red-500" : ""}`}
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quốc Gia</label>
          <input
            type="text"
            name="country"
            value={shippingInfo.country}
            onChange={(e) => handleInputChange(e, "shipping")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.country ? "border-red-500" : ""}`}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
