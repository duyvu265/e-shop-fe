import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanner, updateBanner } from './../../../../features/Admin/bannerSlice';
import AddLinkButton from './AddLinkButton';


const Banners = () => {
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.adminAuth);
  const { banner, error } = useSelector(state => state.banner);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getBanner({ signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const handleStatus = ({ id, status }) => {
    const updateData = { status: status === "hidden" ? "active" : "hidden" };
    dispatch(updateBanner({ id, updateData }));
  };

  const handleDelete = (id) => {
    dispatch(deleteBanner({ id }));
  };

  if (error) {
    return <div className="my-5 text-center text-3xl">{error}</div>;
  }

  return (
    <>
      {banner && (
        <div className="bg-gray-100 my-5 shadow rounded">
          <div className="p-4 border-b">
            <AddLinkButton
              btntext={"Add Banner"}
              link={"/admin/banner/add"}
            />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {banner?.map(ban => {
              const { id, title, status, image } = ban;
              return (
                <div key={id} className="mb-3">
                  <div className="bg-white rounded shadow overflow-hidden">
                    <img className="w-full h-48 object-cover" src={image} alt="" />
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h5 className="text-lg font-bold">{title}</h5>
                        <h6 className="text-gray-600">Status: {status}</h6>
                      </div>
                      <div>
                        <button
                          className={`btn btn-sm mx-1 ${status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                          onClick={() => handleStatus({ id, status })}
                          disabled={(adminData.userType !== 'super admin' && id <= 2)}
                        >
                          {status === 'active' ? 'Hide' : 'Show'}
                        </button>
                        {adminData.userType === 'super admin' && (
                          <button
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white mx-1"
                            onDoubleClick={() => handleDelete(id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Banners;
