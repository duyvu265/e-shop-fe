import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../features/user/userSlice/UserSlice';
import { useState } from 'react';

const CartModal = ({ lineItems }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckout = () => {
    // Logic for handling checkout with selected items
    console.log('Checkout with items:', selectedItems);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItems((prev) => 
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleQuantityChange = (itemId, increment) => {
    const updatedItems = lineItems.map(item => {
      if (item._id === itemId) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    // Update the state or dispatch an action to update the cart
    // You may want to create an action in your slice for updating quantity
  };

  return (
    <div className="absolute w-max p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {lineItems?.length === 0 ? (
        <div>Your Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {lineItems?.map((item) => (
              <div className="flex gap-4" key={item?._id}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleToggleSelect(item._id)}
                />
                {item?.image && (
                  <img
                    src={item?.image}
                    alt={item?.productName.original}
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item?.productName.original}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item?.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item?.quantity} x
                          </div>
                        )}
                        ${item?.price.amount}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item?.availability?.status}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-blue-500 cursor-pointer" 
                        onClick={() => handleQuantityChange(item._id, false)}
                      >
                        -
                      </button>
                      <span className="text-gray-500">{item?.quantity}</span>
                      <button 
                        className="text-blue-500 cursor-pointer" 
                        onClick={() => handleQuantityChange(item._id, true)}
                      >
                        +
                      </button>
                    </div>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Subtotal</span>
            <span>
              ${lineItems?.reduce(
                (total, item) => total + item.price.amount * item.quantity,
                0
              )}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2 mb-4">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="flex justify-between text-sm">
            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
              View Cart
            </button>
            <button
              className="rounded-md py-3 px-4 bg-black text-white"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
