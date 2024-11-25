import { useEffect, useState } from "react";
import { FaSort, FaFilter, FaPlus, FaEdit, FaTrash, FaInfoCircle, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from "../../../features/Admin/couponSlice";

const DiscountManager = () => {
  const { coupon, error } = useSelector((state) => state.couponSlice);
  const [discounts, setDiscounts] = useState([]);
  const dispatch=useDispatch()
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchCoupon({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    setDiscounts(coupon);
  }, [coupon]);

  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    expirationDate: "",
    isActive: true,
    description: "",
    applicableTo: "all",
    product: "",
    category: "",
    userGroup: "",
    minQuantity: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("code");
  const [sortDirection, setSortDirection] = useState("asc");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Code is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    if (!formData.expirationDate) newErrors.expirationDate = "Expiration date is required";
    if (!formData.minQuantity) newErrors.minQuantity = "Minimum quantity is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setDiscounts([...discounts, { ...formData, id: discounts.length + 1 }]);
      setFormData({
        code: "",
        amount: "",
        expirationDate: "",
        isActive: true,
        description: "",
        applicableTo: "all",
        product: "",
        category: "",
        userGroup: "",
        minQuantity: ""
      });
      setIsModalOpen(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(filter.toLowerCase()) ||
    discount.description.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedDiscounts = [...filteredDiscounts].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDiscounts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Discount Manager</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Discount
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Create New Discount</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter discount code"
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (%) *</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter discount amount"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date *</label>
                <input
                  type="date"
                  value={formData.expiration_date}
                  onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.expiration_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiration_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Active Status</label>
                <select
                  value={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter discount description"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Applicable To</label>
                <select
                  value={formData.applicableTo}
                  onChange={(e) => setFormData({ ...formData, applicableTo: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Products</option>
                  <option value="specific">Specific Products</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">User Group</label>
                <input
                  type="text"
                  value={formData.userGroup}
                  onChange={(e) => setFormData({ ...formData, userGroup: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter user group"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Quantity *</label>
                <input
                  type="number"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter minimum quantity"
                />
                {errors.minQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.minQuantity}</p>
                )}
              </div>

              <div className="md:col-span-2 mt-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search discounts..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <FaFilter className="text-gray-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Code",
                  "Amount",
                  "Expiration",
                  "Status",
                  "Description",
                  "Applicable To",
                  "Category",
                  "User Group",
                  "Min Qty",
                  "Actions"
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    <div className="flex items-center gap-1">
                      {header}
                      <FaSort className="text-gray-400" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{discount.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{discount.amount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(discount.expiration_date), "MM/dd/yyyy")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        discount.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {discount.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{discount.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{discount.applicableTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{discount.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{discount.userGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{discount.minQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaInfoCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedDiscounts.length)} of{" "}
            {sortedDiscounts.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= sortedDiscounts.length}
              className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountManager;
