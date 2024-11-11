import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../../../assets/profile.png";
import apiClient from "../../../../services/apiClient";

const UserProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiClient.get(`/users/${id}`)
      .then((response) => {
        setUser(response.data);  
        setLoading(false);  
      })
      .catch((err) => {
        setError(err.message); 
        setLoading(false);  
      });
  }, [id]);

  if (loading) return <div className="mt-2 text-center">Loading...</div>;

  if (error) return <div className="mt-2 h4 text-center">{error}</div>;

  return (
    <>
      {user && (
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="mx-auto" style={{ height: "150px", width: "150px" }}>
                    <img
                      src={user.image ? user.image : image}
                      alt="avatar"
                      className="rounded-full h-36 w-36 object-cover"
                    />
                  </div>
                  <h5 className="my-3 text-xl font-bold">{user.username}</h5>
                  <div className="d-flex justify-center mb-2">
                    <Link
                      className="btn btn-sm me-1 btn-primary"
                      to={`/admin/users/${id}/edit`}
                      state={user}
                      onClick={(e) => user.userType === "super admin" || user.userType === 'guest' ? e.preventDefault() : null}
                    >
                      Edit User Data
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <p className="font-bold">Status:</p>
                    <p>{user.status}</p>
                    <p className="font-bold">User ID:</p>
                    <p>{user.id}</p>
                    <p className="font-bold">Full Name:</p>
                    <p>{user.username}</p>
                    <p className="font-bold">Email:</p>
                    <p>{user.email}</p>
                    <p className="font-bold">Phone:</p>
                    <p>{user.phone}</p>
                    <p className="font-bold">Address:</p>
                    <p>{user.house}, {user.street}</p>
                    <p className="font-bold">State:</p>
                    <p>{user.state}</p>
                    <p className="font-bold">Country:</p>
                    <p>{user.country}</p>
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

export default UserProfile;
