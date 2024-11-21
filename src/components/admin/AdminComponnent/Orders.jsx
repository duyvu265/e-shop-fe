import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrdersTable from './../Orders/OrdersTable';
import Search from './Search';
import { fetchOrders } from './../../../features/Admin/ordersSlice';
import Pagination from './../../Pagination';

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchOrders({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const { error, orders } = useSelector(state => state.orders);
  const [ordersData, setOrdersData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const dataLimit = 4;
  const lastIndex = page * dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = ordersData.length;
  const currentOrders = ordersData.slice(firstIndex, lastIndex);

  useEffect(() => {
    setOrdersData(orders);
  }, [orders]);

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredOrders = orders.filter(order =>
      order.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
    setOrdersData(filteredOrders);
    setPage(1);
  };

  if (error) {
    return <div className="text-center my-5 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="bg-white shadow-md rounded-lg my-5">
        <div className="py-3 px-4 flex justify-end">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="p-4">
          {orders.length ? (
            <>
              <OrdersTable orders={currentOrders} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : (
            <div className="text-center">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
