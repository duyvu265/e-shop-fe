import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../features/user/userSlice/UserSlice';
import { useState } from 'react';

const CartModal = ({ lineItems }) => {
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckout = () => {
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
      if (item.product_id === itemId) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  };


  const calculateSubtotal = () => {
    return lineItems.reduce((total, product) => {
      return total + product.product_items.reduce((itemTotal, item) => {
        return itemTotal + parseFloat(item.price) * product.quantity;
      }, 0);
    }, 0).toFixed(2); 
  };

  return (
    <div className="absolute w-max p-4 rounded-md shadow-lg bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {lineItems?.length === 0 ? (
        <div>Your Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8 max-h-64 overflow-y-auto">
            {lineItems?.map((product) => (
              <div className="flex flex-col gap-4" key={product?.product_id}>
                <h3 className="font-semibold">{product?.product_name}</h3>
                <p>{product?.description}</p>

                {product?.product_items?.map((item, index) => (
                  <div className="flex gap-4" key={`${product?.product_id}-${item?.sku}`}>
                    {item?.images && item?.images.length > 0 && (
                      <img
                        src={item?.images[0]}
                        alt={product?.product_name}
                        width={72}
                        height={96}
                        className="object-cover rounded-md"
                      />
                    )}
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex items-center justify-between gap-8">
                        <div>
                          <div className="text-sm text-gray-500">SKU: {item?.sku}</div>
                          <div className="text-sm text-gray-500">Color: {item?.color}</div>
                          <div className="text-sm text-gray-500">Size: {item?.size}</div>
                          <div className="text-sm text-gray-500">In stock: {item?.qty_in_stock}</div>
                        </div>
                        <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                          <span className="font-semibold">${item?.price}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-blue-500 cursor-pointer" 
                            onClick={() => handleQuantityChange(product?.product_id, false)}
                          >
                            -
                          </button>
                          <span className="text-gray-500">{product?.quantity}</span>
                          <button 
                            className="text-blue-500 cursor-pointer" 
                            onClick={() => handleQuantityChange(product?.product_id, true)}
                          >
                            +
                          </button>
                        </div>
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleRemoveItem(product?.product_id)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Subtotal</span>
            <span>${calculateSubtotal()}</span>
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
