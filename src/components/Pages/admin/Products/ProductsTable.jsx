import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, updateProduct } from "../../../../features/Admin/productsSlice";

const ProductsTable = ({ products }) => {
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.adminAuth);

  const handleStatus = ({ id, status }) => {
    const updateData = { status: status === "active" ? "hidden" : "active" };
    dispatch(updateProduct({ id, updateData }));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm text-center">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
            <th className="py-3 px-6">Id</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Category</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {products?.map((product) => {
            const { id, images, title, category, price, status } = product;
            const imageUrl = images.length > 0 ? images[0] : "default-image-url.jpg";

            return (
              <tr key={id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 max-w-[50px] truncate">{id}</td>
                <td className="py-3 px-6 flex items-center space-x-2">
                  <img className="w-8 h-8 rounded" src={imageUrl} alt={title} />
                  <span className="font-semibold max-w-[150px] truncate">{title}</span>
                </td>
                <td className="py-3 px-6 max-w-[100px] truncate">
                  {category?.category_name || "N/A"}
                </td>
                <td className="py-3 px-6 max-w-[80px] truncate">{price}</td>
                <td className="py-3 px-6">
                  <div className="flex items-center justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={status === "active"}
                        onChange={() => handleStatus({ id, status })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 capitalize">
                        {status}
                      </span>
                    </label>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="flex space-x-2 justify-center">
                    <Link className="btn-sm btn-primary" to={`/admin/products/${id}/edit`}>
                      Edit
                    </Link>
                    <Link className="btn-sm btn-success" to={`/admin/products/${id}`}>
                      View
                    </Link>
                    {adminData.userType === "super admin" && (
                      <button
                        onClick={() => handleDelete(id)}
                        className="btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    )}
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

export default ProductsTable;
