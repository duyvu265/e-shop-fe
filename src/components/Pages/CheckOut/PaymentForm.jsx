// PaymentForm.js
const PaymentForm = ({ paymentInfo, handleInputChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông Tin Thanh Toán</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số Thẻ</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={(e) => handleInputChange(e, "payment")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.cardNumber ? "border-red-500" : ""}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày Hết Hạn</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={(e) => handleInputChange(e, "payment")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.expiryDate ? "border-red-500" : ""}`}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={(e) => handleInputChange(e, "payment")}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.cvv ? "border-red-500" : ""}`}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
