import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { updateUser } from './../../../../features/Admin/usersSlice';

const UserEdit = () => {
    const { id } = useParams();
    const { state } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector(state => state.users);

    const [userData, setUserData] = useState({
        username: state.username,
        phone: state.phone,
        email: state.email,
        password: state.password,
        status: state.status
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isExists = users.some(user => user.email === userData.email && user.id !== Number(id));

        if (isExists) {
            toast.dismiss();
            toast.error('A user already uses this email');
        } else {
            const updateData = userData;

            dispatch(updateUser({ id, updateData }))
                .unwrap(unwrapResult)
                .then(res => {
                    if (res.status) {
                        setUserData({ username: "", phone: "", email: "", password: "", status: "" });
                        setTimeout(() => {
                            navigate(-1);
                        }, 1000);
                    }
                });
        }
    }

    const [viewPass, setViewPass] = useState(false);

    return (
        <div className="container mx-auto my-5">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
                <div className="bg-gray-200 p-4 rounded-t-lg">
                    <h4 className="font-bold">Edit User</h4>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="block text-sm font-bold mb-1">User Name:</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter user name"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-sm font-bold mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="block text-sm font-bold mb-1">Phone:</label>
                            <input
                                type="number"
                                id="phone"
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder="Enter phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-bold mb-1">Password:</label>
                            <div className="flex items-center">
                                <input
                                    type={!viewPass ? "password" : "text"}
                                    id="password"
                                    className="flex-grow border border-gray-300 rounded-md p-2"
                                    placeholder="Enter password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="ml-2 p-2 border border-gray-300 rounded-md"
                                    type="button"
                                    onClick={() => setViewPass(!viewPass)}
                                >
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="block text-sm font-bold mb-1">Status:</label>
                            <select
                                className="w-full border border-gray-300 rounded-md p-2"
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
                        <div className="flex">
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary mr-2 bg-blue-500 text-white rounded-md px-4 py-2"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger bg-red-500 text-white rounded-md px-4 py-2"
                                onClick={() => navigate(-1)}
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
