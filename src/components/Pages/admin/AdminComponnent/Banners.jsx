import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, getBanner, updateBanner } from './../../../../features/Admin/bannerSlice';
import AddLinkButton from './AddLinkButton';

const Banners = () => {
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.adminAuth);
  const { banner, error } = useSelector(state => state.banner);
  const getListBanners = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(getBanner({ signal }));

    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    getListBanners();
  }, [dispatch]);

  const handleStatus = ({ id, status }) => {
    const updateData = { status: status ? "False" : "True" };
    dispatch(updateBanner({ id, updateData })).then(() => {

      getListBanners();
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa banner này không?");
    if (confirmDelete) {
      dispatch(deleteBanner({ id })).then(() => {

        getListBanners();
      });
    }
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
              const { id, title, status, image, description, start_date, end_date } = ban;
              return (
                <div key={id} className="mb-3">
                  <div className="bg-white rounded shadow overflow-hidden">
                    <img className="w-full h-48 object-cover" src={image} alt={title} />
                    <div className="p-4">
                      <h5 className="text-lg font-bold">{title}</h5>
                      <p className="text-gray-700 text-sm">{description}</p>
                      <div className="text-gray-500 text-xs mt-2">
                        <p>Start date: {new Date(start_date).toLocaleDateString()}</p>
                        <p>End date: {new Date(end_date).toLocaleDateString()}</p>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="text-gray-600">
                          Status: {status ? "Active" : "Inactive"}
                        </div>
                        <div className="flex">
                          <button
                            className={`btn btn-sm mx-1 ${status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1 rounded`}
                            onClick={() => handleStatus({ id, status })}
                            disabled={(adminData.userType !== 'admin' && id <= 2)}
                          >
                            {status ? 'Hide' : 'Show'}
                          </button>
                          {adminData?.userType === 'admin' && (
                            <button
                              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white mx-1 px-3 py-1 rounded"
                              onClick={() => handleDelete(id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
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
