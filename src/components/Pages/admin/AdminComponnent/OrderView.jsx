import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiClient from "../../../../services/apiClient";
import { updateOrderStatus } from "../../../../features/Admin/ordersSlice";

const OrderView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // States to manage order data, loading, and error
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load order data");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { status: currentStatus };
    if (currentStatus.length) {
      dispatch(updateOrderStatus({ id, updateData }))
        .unwrap()
        .then((res) => {
          if (res.status) {
            setTimeout(() => {
              navigate(-1);
            }, 500);
          }
        });
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="text-center my-5 text-red-600">{error}</div>;

  return (
    <>
      {order && (
        <div className="max-w-7xl mx-auto p-5">
          <div className="bg-white shadow-md rounded-lg my-5 p-4">
            <div className="mt-2">
              <div className="mb-4">
                <div className="font-bold">Order Status:</div>
                <div className="text-gray-700">Order ID: {order.id}</div>
                <div className="text-gray-700">Coupon: {order.coupon}</div>
                <div>
                  <span className="font-semibold">Order Status:</span>
                  <span className="text-gray-700"> {order.status}</span>
                </div>
                <form className="mt-2" onSubmit={handleSubmit}>
                  <select
                    className="border rounded-md p-1 mr-2"
                    onChange={handleChange}
                    defaultValue={order.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                  </select>
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                    type="submit"
                    disabled={currentStatus.length < 2 || currentStatus === order.status}
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="mb-4">
                <div className="font-bold">Customer:</div>
                <div>
                  <span className="font-semibold">Customer ID:</span>
                  <span className="text-gray-700"> {order.customerId}</span>
                </div>
                <div className="text-gray-700">Name: {order.customerName}</div>
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="text-gray-700"> {order.customerEmail}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="font-bold">Deliver to:</div>
                <div>
                  <span className="font-semibold">Name:</span>
                  <span className="text-gray-700"> {order.deliveryInfo.name}</span>
                </div>
                <div>
                  <span className="font-semibold">Phone:</span>
                  <span className="text-gray-700"> {order.deliveryInfo.phone}</span>
                </div>
                <div>
                  <span className="font-semibold">Address:</span>
                  <span className="text-gray-700"> {order.deliveryInfo.house}, {order.deliveryInfo.street}, {order.deliveryInfo.state}</span>
                </div>
                <div>
                  <span className="font-semibold">Country:</span>
                  <span className="text-gray-700"> {order.deliveryInfo.country}</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto my-2">
              <table className="min-w-full table-auto text-center">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-2">Id</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => {
                    const { id, image, title, price, quantity, total } = product;

                    return (
                      <tr key={id}>
                        <td className="p-2">{id}</td>
                        <td className="p-2">
                          <div className="flex items-center justify-center">
                            <img className="h-10 w-10 mr-2" src={image} alt={title} />
                            <span className="font-semibold text-left">{title}</span>
                          </div>
                        </td>
                        <td className="p-2">{price.toFixed(2)}$</td>
                        <td className="p-2">{quantity}</td>
                        <td className="p-2 font-semibold">{total.toFixed(2)}$</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="text-left mb-3">
              <div>
                <span className="font-semibold">Sub-total:</span>
                <span> {order.subTotal.toFixed(2)}$</span>
              </div>
              <div>
                <span className="font-semibold">Discount:</span>
                <span> {order.discountPercent}%</span>
              </div>
              <div>
                <span className="font-semibold">Total:</span>
                <span> {order.total.toFixed(2)}$</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderView;
