import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddDiscountForm = ({ showModal, setShowModal, addDiscount }) => {
  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    expirationDate: "",
    isActive: true,
    description: "",
    applicableTo: "",
    product: "",
    category: "",
    userGroup: "",
    minQuantity: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = "Code is required";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be positive";
    if (!formData.expirationDate) newErrors.expirationDate = "Expiration date is required";
    if (new Date(formData.expirationDate) < new Date()) newErrors.expirationDate = "Expiration date must be in the future";
    if (!formData.minQuantity || formData.minQuantity < 1) newErrors.minQuantity = "Minimum quantity must be at least 1";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      addDiscount({ ...formData, id: Date.now() });
      setShowModal(false);
      setFormData({
        code: "",
        amount: "",
        expirationDate: "",
        isActive: true,
        description: "",
        applicableTo: "",
        product: "",
        category: "",
        userGroup: "",
        minQuantity: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ${showModal ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Discount</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
              <IoMdClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (%)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.expirationDate && <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Applicable To</label>
                <select
                  name="applicableTo"
                  value={formData.applicableTo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select option</option>
                  <option value="all">All Products</option>
                  <option value="specific">Specific Products</option>
                  <option value="category">Category</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Food">Food</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">User Group</label>
                <select
                  name="userGroup"
                  value={formData.userGroup}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select user group</option>
                  <option value="Regular">Regular</option>
                  <option value="VIP">VIP</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Quantity</label>
                <input
                  type="number"
                  name="minQuantity"
                  value={formData.minQuantity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.minQuantity && <p className="text-red-500 text-sm mt-1">{errors.minQuantity}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Discount
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiscountForm;
