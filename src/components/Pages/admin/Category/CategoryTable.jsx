import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, updateCategoryStatus } from "../../../../features/Admin/categorySlice";

const CategoryTable = ({ currentCategory }) => {
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.adminAuth);

  const handleStatus = ({ id, status }) => {
    const updateData = { status: status === "hidden" ? "active" : "hidden" };
    dispatch(updateCategoryStatus({ id, updateData }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?");
    if (confirmDelete) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 font-semibold text-gray-700">Id</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Category</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Category Name</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Image</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Status</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCategory?.map((cat) => {
            const { id, category, category_name, image_url, status } = cat;
            const isDisabled = adminData.userType !== "super admin" && id <= 4;

            return (
              <tr key={id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{id}</td>
                <td className="py-2 px-4">{category}</td>
                <td className="py-2 px-4">{category_name}</td>
                <td className="py-2 px-4">
                  <img src={image_url} alt={category_name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      role="switch"
                      id={`switch-${id}`}
                      className="w-5 h-5 text-blue-600 bg-gray-200 rounded focus:ring-0"
                      defaultChecked={status === "active"}
                      onChange={() => handleStatus({ id, status })}
                      disabled={isDisabled}
                    />
                    <label htmlFor={`switch-${id}`} className="ml-2 text-sm">
                      {status}
                    </label>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className={`bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 focus:outline-none ${isDisabled ? 'disabled:bg-red-300' : ''}`}
                      onClick={() => handleDelete(id)}
                      disabled={isDisabled}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
