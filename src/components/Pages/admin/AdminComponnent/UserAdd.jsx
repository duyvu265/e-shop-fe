import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { addUser } from "../../../../features/Admin/usersSlice";

const UserAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.users);

    const [userData, setUserData] = useState({ username: "", phone: "", email: "", password: "", userType: "admin", status: "" });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isExists = users.find(user => user.email === userData.email);

        if (isExists) {
            toast.dismiss();
            toast.error('A user already uses this email');
        } else {
            dispatch(addUser(userData))
                .unwrap(unwrapResult)
                .then(res => {
                    if (res.status) {
                        setUserData({ username: "", phone: "", email: "", password: "", userType: "admin", status: "" });
                        setTimeout(() => {
                            navigate('/admin/users');
                        }, 1000);
                    }
                });
        }
    }

    const [viewPass, setViewPass] = useState(false);

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
                <div className="px-4 py-3 border-b">
                    <h4 className="font-bold">Add User</h4>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-bold mb-2">User Name:</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter user name"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-bold mb-2">Phone:</label>
                            <input
                                type="number"
                                id="phone"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
                            <div className="relative">
                                <input
                                    type={!viewPass ? "password" : "text"}
                                    id="password"
                                    className="w-full border rounded px-3 py-2"
                                    placeholder="Enter password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="absolute right-0 top-0 h-full px-3 py-2"
                                    type="button"
                                    onClick={() => setViewPass(!viewPass)}
                                >
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-bold mb-2">Status:</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                id="status"
                                value={userData.status}
                                name="status"
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-700"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserAdd;
