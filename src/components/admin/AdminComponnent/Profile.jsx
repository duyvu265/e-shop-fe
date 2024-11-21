import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import image from '../../../assets/profile.png';

const Profile = () => {
  const { adminData } = useSelector(state => state.adminAuth);

  return (
    <>
      {adminData && (
        <div className="container mx-auto py-5">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 mb-4">
              <div className="card bg-white shadow rounded-lg">
                <div className="card-body text-center p-5">
                  <div className="mx-auto mb-4" style={{ height: "150px", width: "150px" }}>
                    <img
                      src={adminData.image ? adminData.image : image}
                      alt=""
                      className="rounded-full h-full w-full object-cover"
                    />
                  </div>
                  <h5 className="my-3 text-lg font-semibold">{adminData.username}</h5>
                  <div className="mb-2">
                    <Link
                      className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      to={`/admin/profile/edit`}
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="card bg-white shadow rounded-lg mb-4">
                <div className="card-body p-5">
                  {[
                    { label: 'Status', value: adminData.status },
                    { label: 'User ID', value: adminData.id },
                    { label: 'Full Name', value: adminData.username },
                    { label: 'Email', value: adminData.email },
                    { label: 'Phone', value: adminData.phone },
                    { label: 'Address', value: `${adminData.house}, ${adminData.street}` },
                    { label: 'State', value: adminData.state },
                    { label: 'Country', value: adminData.country },
                  ].map((item, index) => (
                    <div className="flex mb-2" key={index}>
                      <div className="w-1/3 font-semibold">{item.label}:</div>
                      <div className="w-2/3">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
