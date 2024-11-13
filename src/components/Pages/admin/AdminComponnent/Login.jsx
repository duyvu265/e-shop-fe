import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../../../features/Admin/adminAuthSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode'; 

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    if (token && isTokenValid(token)) {
       navigate("/admin/dashboard");     
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleLoginSuccess = (userInfo) => {
    if (userInfo.userInfo.user_type !== "admin") {
      toast.error('Your account is deactivated by super admin');
    } else {
      dispatch(login(userInfo));
      navigate("/admin/dashboard");
    }
  };

  const handleLoginError = (err) => {
    console.error(err);
    const message = err.response?.data?.message || 'An error occurred while logging in';
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/v1/admin/login/`, { email, password });
      handleLoginSuccess(response.data);
    } catch (err) {
      handleLoginError(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                id="pwd"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
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
