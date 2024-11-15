// CartItem.js
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div key={item.id} className="flex items-center mb-4 p-4 border rounded-lg">
      <img
        src={`https://${item.image}`}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-gray-600">{item.price} VNĐ</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-700"
        aria-label="Remove item"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
