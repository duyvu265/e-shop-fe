import React from "react";
import { useParams } from "react-router-dom";
import image from "../../../../assets/profile.png"
import apiClient from "../../../../services/apiClient";
import Loadding from "../../../Loadding";
import useFetch from './../../../../features/Admin/useFetch';
const CustomerProfile = () => {
  const { id } = useParams();
  const { data: user, error, loading } = useFetch(`${apiClient}/customers/${id}`);

  if (loading) return <div className="mt-4 text-center"><Loadding /></div>;
  if (error) return <div className="mt-2 text-red-500 text-center">{error}</div>;

  return (
    <>
      {user && (
        <div className="container py-5">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 mb-4 lg:mb-0">
              <div className="bg-white rounded-lg shadow-md">
                <div className="text-center p-4">
                  <div className="mx-auto h-36 w-36">
                    <img
                      src={user.image ? user.image : image}
                      alt="avatar"
                      className="rounded-full h-full w-full object-cover"
                    />
                  </div>
                  <h5 className="my-4 text-xl font-bold">{user.username}</h5>
                </div>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md mb-4">
                <div className="p-4">
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Status:</p>
                    <p className="col-span-2">{user.status}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">User Id:</p>
                    <p className="col-span-2">{user.id}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Full Name:</p>
                    <p className="col-span-2">{user.username}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Email:</p>
                    <p className="col-span-2">{user.email}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Phone:</p>
                    <p className="col-span-2">{user.phone}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Address:</p>
                    <p className="col-span-2">{user.house}, {user.street}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">State:</p>
                    <p className="col-span-2">{user.state}</p>
                  </div>
                  <div className="grid grid-cols-3 mb-2">
                    <p className="font-bold">Country:</p>
                    <p className="col-span-2">{user.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerProfile;
