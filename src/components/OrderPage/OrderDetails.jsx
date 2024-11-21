import { useState } from "react";
import { FiTruck, FiPackage, FiCheck, FiInfo } from "react-icons/fi";

const OrderDetails = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const orderData = {
    orderNumber: "ORD-2024-0123",
    date: "January 15, 2024",
    status: "delivered",
    discount: 20.00,
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main Street, Apt 4B, New York, NY 10001"
    },
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        quantity: 1,
        image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 159.98,
        quantity: 2,
        image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
      }
    ]
  };

  const calculateTotalBeforeDiscount = () => {
    return orderData.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalBeforeDiscount = calculateTotalBeforeDiscount();
  const totalAfterDiscount = totalBeforeDiscount - orderData.discount;

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const StatusProgress = () => {
    const steps = ["processing", "shipped", "delivered"];
    const currentStep = steps.indexOf(orderData.status);

    return (
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? getStatusColor(step) : "bg-gray-200"
                } text-white transition-all duration-300`}
              >
                {index === 0 && <FiPackage className="w-5 h-5" />}
                {index === 1 && <FiTruck className="w-5 h-5" />}
                {index === 2 && <FiCheck className="w-5 h-5" />}
              </div>
              <span className="mt-2 text-sm font-medium capitalize">{step}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 h-1 bg-gray-200 w-full -z-10">
          <div
            className={`h-full ${getStatusColor(orderData.status)} transition-all duration-300`}
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-sm text-gray-600 mt-1">Order #{orderData.orderNumber}</p>
              </div>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Order Information"
                >
                  <FiInfo className="w-6 h-6" />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white text-sm rounded-md py-2 px-3 z-10">
                    Click for additional order information
                  </div>
                )}
              </div>
            </div>

            <StatusProgress />

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <img
                      src={`https://${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                      }}
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <div className="mt-1 text-sm text-gray-600">
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h2>
              <div className="text-sm text-gray-600">
                <p className="mb-1">Date: {orderData.date}</p>
                <p className="mb-1">
                  Status: <span className="capitalize">{orderData.status}</span>
                </p>
                <p className="mb-1">
                  Total Before Discount: <span className="font-bold">${totalBeforeDiscount.toFixed(2)}</span>
                </p>
                <p className="mb-1">
                  Discount: <span className="text-red-500">-${orderData.discount.toFixed(2)}</span>
                </p>
                <p className="font-bold">
                  Total After Discount: <span className="text-green-600">${totalAfterDiscount.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Track Shipment"
              >
                Track Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
