import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";
import ChatBox from './../messages/ChatBox';

const Add = ({ stockNumber }) => {
  const [quantity, setQuantity] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleChat = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsChatOpen(true); 
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); 
  };

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
          onClick={handleChat}
        >
          <FaComments />
          <span>Chat với người bán</span>
        </button>
      </div>

      <h4 className="font-medium text-lg">Chọn Số lượng</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              className="px-4 py-2 text-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:opacity-40"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              −
            </button>
            <span className="px-6 py-2 text-lg">{quantity}</span>
            <button
              className="px-4 py-2 text-lg bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:opacity-40"
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          <div className="text-xs text-gray-600">
            {stockNumber > 0 ? (
              <span>
                Còn lại <span className="text-orange-500">{stockNumber}</span> sản phẩm!
              </span>
            ) : (
              <span className="text-red-500">Hết hàng</span>
            )}
          </div>
        </div>
        <button
          className="px-6 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[450px] max-h-[600px] rounded-lg shadow-xl z-100">
          <ChatBox onClose={handleCloseChat} />
        </div>
      )}
    </div>
  );
};

export default Add;
