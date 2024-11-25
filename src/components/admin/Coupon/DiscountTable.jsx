import React from "react";
import Pagination from "../../Pagination";

const DiscountList = ({
  currentItems,
  handleSort,
  filter,
  setFilter,
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) => {
  return (
    <div className="bg-white rounded shadow-md">
      <div className="flex items-center justify-between border-b p-4 bg-gray-50">
        <h5 className="text-xl font-semibold text-gray-700">Danh sách mã giảm giá</h5>
        <input
          type="text"
          placeholder="Tìm kiếm mã giảm giá..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />
      </div>

      <div className="p-4">
        {currentItems?.length ? (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("code")}
                    className="cursor-pointer hover:underline"
                  >
                    Mã giảm giá
                  </th>
                  <th>Mô tả</th>
                  <th>Số tiền</th>
                  <th>Ngày hết hạn</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td>{item.code}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>{item.expirationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={currentPage}
              setPage={setCurrentPage}
              total={totalItems}
              limit={itemsPerPage}
            />
          </>
        ) : (
          <div className="text-gray-500 text-center py-4">Không có mã giảm giá nào.</div>
        )}
      </div>
    </div>
  );
};

export default DiscountList;
