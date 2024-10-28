import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanner, updateBanner } from './../../../../features/Admin/bannerSlice';
import AddLinkButton from './AddLinkButton';

const Banners = () => {
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.adminAuth);
  const { banner, error } = useSelector(state => state.banner);
  console.log(banner);

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
    return <div className="my-5 text-center text-3xl text-red-500">{error}</div>;
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
            {banner.map(ban => {
              const { id, title, status, image } = ban;
              return (
                <div key={id} className="mb-3">
                  <div className="bg-white rounded shadow overflow-hidden">
                    <img className="w-full h-48 object-cover" src={image} alt={title} />
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h5 className="text-lg font-bold">{title}</h5>
                        <h6 className="text-gray-600">Status: {status ? "Active" : "Inactive"}</h6>
                      </div>
                      <div className="flex">
                        <button
                          className={`btn btn-sm mx-1 ${status === 'hidden' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded`}
                          onClick={() => handleStatus({ id, status })}
                          disabled={(adminData.userType !== 'admin' && id <= 2)}
                        >
                          {status === 'active' ? 'Hide' : 'Show'}
                        </button>
                        {adminData.userType === 'admin' && (
                          <button
                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white mx-1 px-3 py-1 rounded"
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
