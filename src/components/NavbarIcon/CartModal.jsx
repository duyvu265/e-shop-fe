import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../features/user/userSlice/UserSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { MdAdd, MdRemove } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartModal = ({ lineItems }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleCheckout = () => {
    setIsLoading(true);
    console.log('Checkout with items:', selectedItems);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Checkout thành công!');
    }, 2000);
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
    toast.success('Sản phẩm đã được xóa khỏi giỏ hàng');
  };

  const handleIncreaseQty = (productId) => {
    const product = lineItems?.find((item) => item?.product_id === productId);
    if (product.qty < product.qty_in_stock) {
      dispatch(updateCartItemQuantity({ productId, qty: product.qty + 1 }));
    } else {
      toast.error('Số lượng không thể lớn hơn số lượng trong kho.');
    }
  };

  const handleDecreaseQty = (productId) => {
    const product = lineItems?.find((item) => item?.product_id === productId);
    if (product.qty > 1) {
      dispatch(updateCartItemQuantity({ productId, qty: product.qty - 1 }));
    } else {
      toast.error('Số lượng không thể nhỏ hơn 1.');
    }
  };

  const calculateSubtotal = () => {
    return lineItems?.reduce((total, product) => {
      return total + product?.qty * (product?.price || 0);
    }, 0).toFixed(2);
  };

  const applyDiscount = () => {
    if (discountCode === 'DISCOUNT10') {
      const subtotal = calculateSubtotal();
      const discount = (subtotal * 0.1).toFixed(2);
      setDiscountAmount(discount);
      toast.success('Mã giảm giá đã được áp dụng!');
    } else {
      toast.error('Mã giảm giá không hợp lệ.');
    }
  };

  const totalAmount = (calculateSubtotal() - discountAmount).toFixed(2);

  return (
    <div className="absolute p-6 rounded-lg shadow-lg bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {lineItems?.length === 0 ? (
        <div className="text-center text-lg font-semibold">Giỏ hàng của bạn trống</div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center">Giỏ Hàng</h2>
          <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
            {lineItems?.map((product) => (
              <div className="flex flex-col p-4 border-b border-gray-200" key={product?.product_id}>
                <div className="flex items-center gap-4">
                  {product?.image?.length > 0 && (
                    <img
                      src={product.image[0]}
                      alt={product?.product_name}
                      width={72}
                      height={96}
                      className="object-cover rounded-md shadow"
                    />
                  )}
                  <div className="flex flex-col">
                    <h3 className="font-semibold truncate w-36">{product?.product_name}</h3>
                    <p className="text-gray-600 truncate w-36">{product?.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      onClick={() => handleDecreaseQty(product?.product_id)}
                    >
                      <MdRemove className="text-lg" />
                    </button>
                    <span className="px-2 py-1 border-t border-b border-gray-300">{product.qty}</span>
                    <button
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      onClick={() => handleIncreaseQty(product?.product_id)}
                    >
                      <MdAdd className="text-lg" />
                    </button>
                  </div>
                  <span className="font-semibold text-sm">${(product?.qty * (product?.price || 0)).toFixed(2)}</span>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleRemoveItem(product?.product_id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-2">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="text-red-500 font-semibold text-lg">
              <s>${calculateSubtotal()}</s>
            </span>
            {discountAmount > 0 && (
              <p className="text-green-500 font-semibold mt-1">
                Giá sau giảm: ${totalAmount}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="Mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mb-1"
            />
            <button
              onClick={applyDiscount}
              className="bg-blue-500 text-white rounded-md py-1 hover:bg-blue-600 transition"
            >
              Áp dụng
            </button>
          </div>
          <div className="flex justify-between">
            <Link to={"/view-cart"} className="rounded-md py-2 px-3 ring-1 ring-gray-300 hover:bg-gray-100 transition">
              Xem Giỏ Hàng
            </Link>
            <button
              className="rounded-md py-2 px-3 bg-black text-white hover:bg-gray-800 transition"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
            </button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default CartModal;
