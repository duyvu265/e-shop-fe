import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from './../../../../features/Admin/couponSlice';
import AddCoupon from './../Coupon/AddCoupon';
import EditCoupon from './../Coupon/EditCoupon';
import Search from "./Search";
import CouponTable from './../Coupon/CouponTable';
import Pagination from "../../../Pagination";


const Coupon = () => {
  const dispatch = useDispatch();
  const { coupon, error } = useSelector((state) => state.couponSlice);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchCoupon({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const [cuponData, setCuponData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const dataLimit = 3;
  const lastIndex = page * dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = cuponData.length;
  const currentCoupon = cuponData.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCuponData(coupon);
    setPage(1);
  }, [coupon]);

  // Search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCoupon = coupon.filter(c => c.coupon.toLowerCase().includes(searchText.toLowerCase()));
    setCuponData(filteredCoupon);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({ id: '', coupon: '', discount: '', status: '' });

  if (error) {
    return <div className="my-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container my-5">
      {!isEdit ? (
        <AddCoupon coupon={coupon} />
      ) : (
        <EditCoupon setIsEdit={setIsEdit} editData={editData} coupon={coupon} />
      )}

      <div className="bg-white rounded shadow-md mt-4">
        <div className="flex items-center justify-between border-b p-3">
          <h5 className="text-lg font-semibold">Coupon</h5>
          <Search handleSearch={handleSearch} />
        </div>
        <div className="p-3">
          {coupon.length ? (
            <>
              <CouponTable currentCoupon={currentCoupon} setEditData={setEditData} setIsEdit={setIsEdit} isEdit={isEdit} />
              <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
