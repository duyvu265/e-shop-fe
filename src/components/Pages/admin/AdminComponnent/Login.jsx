import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../../../features/Admin/adminAuthSlice';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { email, password } = loginData;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/v1/admin/login/`, {
        email,
        password,
      });

      const userInfo = response.data;

      if (userInfo.status !== 'active') {
        toast.error('Your account is deactivated by super admin');
      } else {
        dispatch(login(userInfo));
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || 'An error occurred while logging in');
      } else {
        toast.error('An error occurred while logging in');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-center text-2xl font-bold mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                id="pwd"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                type="password"
                placeholder="Enter password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;