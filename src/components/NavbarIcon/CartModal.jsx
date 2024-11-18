import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../features/user/userSlice/UserSlice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ lineItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
  };

  const handleIncreaseQty = (productId) => {
    const product = lineItems.find((item) => item.product_id === productId);
    if (product.qty < product.qty_in_stock) {
      dispatch(updateCartItemQuantity({ productId, qty: product.qty + 1 }));
    } else {
      toast.error('Số lượng không thể lớn hơn số lượng trong kho.');
    }
  };

  const handleDecreaseQty = (productId) => {
    const product = lineItems.find((item) => item.product_id === productId);
    if (product.qty > 1) {
      dispatch(updateCartItemQuantity({ productId, qty: product.qty - 1 }));
    } else {
      toast.error('Số lượng không thể nhỏ hơn 1.');
    }
  };

  const calculateTotal = () => {
    return lineItems.reduce((total, product) => {
      return total + product.qty * (product.price || 0);
    }, 0).toFixed(2);
  };

  return (
    <div
      className="absolute right-0 mt-4 w-96 bg-white rounded-lg shadow-xl z-50 transform transition-all duration-300 ease-in-out"
      role="dialog"
      aria-label="Shopping cart dropdown"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Giỏ Hàng</h2>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {lineItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">Giỏ hàng của bạn trống.</div>
        ) : (
          lineItems.map((product) => (
            <div
              key={product.product_id}
              className="p-4 border-b border-gray-200 flex items-center gap-4"
            >
              <img
                src={product.image[0]}
                alt={product.product_name}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                }}
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{product.product_name}</h3>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => handleDecreaseQty(product.product_id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Decrease quantity"
                  >
                    <AiOutlineMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{product.qty}</span>
                  <button
                    onClick={() => handleIncreaseQty(product.product_id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    aria-label="Increase quantity"
                  >
                    <AiOutlinePlus className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-600">
                    ${(product.qty * product.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(product.product_id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    aria-label={`Remove ${product.product_name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {lineItems.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Tổng tiền: ${calculateTotal()}</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => (navigate("/checkout"))}
              className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Tiến hành thanh toán
            </button>
            <button
              className="w-full py-2 px-4 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default CartModal;
