import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Search from './Search';
import CustomersTable from './../Customers/CustomersTable';
import { fetchCustomers } from '../../../features/Admin/usersSlice';
import Pagination from '../../Pagination';

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchCustomers({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const { customers = [], error } = useSelector(state => state.customersSlice.customers); 
  const [customersData, setCustomersData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const dataLimit = 5;
  const lastIndex = page * dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = customersData?.length;
  const currentCustomers = customersData?.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (Array.isArray(customers)) {
      setCustomersData(customers);
    } else {
      setCustomersData([]); 
    }
  }, [customers]);

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCustomer = customers?.filter(customer =>
      customer.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setCustomersData(filteredCustomer);
    setPage(1);
  };

  if (error) {
    return <div className="text-red-500 text-center my-5">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md my-5">
        <div className="flex justify-end p-4">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="p-4">
          {customers.length ? (
            <>
              <CustomersTable customers={currentCustomers} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : (
            <div className="text-center">Không có khách hàng nào.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
