import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";

const CategoryAdd = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ category: '', status: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.dismiss();
    toast.info('Uploading category');

   
    apiClient.post(`/category`, category)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          toast.dismiss();
          toast.success('Category uploaded');
          setCategory({ category: '', status: '' });  
          navigate('/admin/category');  
        }
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message);  
      });
  };

  return (
    <div className="flex items-center justify-center my-5">
      <div className="bg-white rounded shadow-md w-full max-w-md">
        <div className="px-4 py-3 border-b">
          <h3 className="text-lg font-bold">Add Category</h3>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-bold mb-1"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Enter category name"
                name="category"
                value={category.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="border border-gray-300 rounded w-full p-2"
                id="status"
                value={category.status}
                name="status"
                onChange={handleChange}
                required
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryAdd;
