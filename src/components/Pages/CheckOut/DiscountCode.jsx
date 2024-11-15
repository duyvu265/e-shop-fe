// DiscountCode.js
const DiscountCode = ({ discountCode, setDiscountCode }) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Mã Giảm Giá
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="flex-grow p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nhập mã giảm giá"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Áp Dụng
        </button>
      </div>
    </div>
  );
};

export default DiscountCode;
