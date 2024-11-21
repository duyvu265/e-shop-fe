import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import dummyImage from '../../../assets/profile.png';
import { updateCustomer } from '../../../features/Admin/customersSlice';

const CustomersTable = ({ customers }) => {
    const dispatch = useDispatch();

    const handleStatus = ({ id, status }) => {
        const updateData = { status: status === 'blocked' ? 'active' : 'blocked' };
        dispatch(updateCustomer({ id, updateData }));
    };

    return (
        <div className="table-responsive">
            <table className="table align-items-center text-center min-w-full table-fixed">
                <thead className="thead-light">
                    <tr>
                        <th className="w-1/12">Id</th>
                        <th className="w-2/12">Name</th>
                        <th className="w-2/12">Email</th>
                        <th className="w-2/12">Phone</th>
                        <th className="w-1/12">Status</th>
                        <th className="w-2/12">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer) => {
                        const { id, username, image, email, phone, status } = customer;

                        return (
                            <tr key={id}>
                                <td className="truncate">{id}</td>
                                <td className="text-start">
                                    <Link
                                        className="flex gap-2 items-center text-decoration-none text-dark truncate"
                                        to={`/admin/customers/${id}`}
                                    >
                                        <img
                                            className="h-8 w-8 object-cover"
                                            src={image ? image : dummyImage}
                                            alt=""
                                        />
                                        <span className="truncate">{username}</span>
                                    </Link>
                                </td>
                                <td className="truncate">{email}</td>
                                <td className="truncate">{phone}</td>
                                <td className="fw-bold">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={status === "active"}
                                            onChange={() => handleStatus({ id, status })}
                                            disabled={id === 1}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-focus:ring-2 peer-focus:ring-blue-300">
                                            <div className="w-5 h-5 bg-white rounded-full shadow transform transition-all duration-200 peer-checked:translate-x-5"></div>
                                        </div>
                                    </label>
                                </td>
                                <td>
                                    <div className="flex items-center">
                                        <Link
                                            className="btn btn-sm btn-primary me-1"
                                            to={`/admin/customers/${id}/edit`}
                                            state={customer}
                                        >
                                            edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(id)} 
                                            disabled={id === 1} 
                                        >
                                            delete
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
}

export default CustomersTable;
