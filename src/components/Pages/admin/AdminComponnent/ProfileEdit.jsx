import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../../services/apiClient";
import { updateAdmin } from "../../../../features/Admin/adminAuthSlice";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { adminData } = useSelector(state => state.adminAuth);

    const initialState = {
        username: adminData.username || '',
        email: adminData.email,
        phone: adminData.phone,
        house: adminData.house || '',
        street: adminData.street || '',
        state: adminData.state || '',
        country: adminData.country || '',
        image: adminData.image || ''
    };

    const [profileData, setProfileData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        toast.dismiss();
        toast.info('Uploading image...');

        fetch(`${apiClient}/upload-image/`, { 
            method: 'POST',
            body: formData,
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                } else {
                    toast.dismiss();
                    toast.success('Image Uploaded');
                    return res.json();
                }
            })
            .then(data => {
                setProfileData(prev => ({ ...prev, image: data.url })); 
            })
            .catch(error => {
                toast.dismiss();
                toast.error('Image upload failed');
                console.log(error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = adminData.id;

        toast.dismiss();
        toast.info('Updating...');

        try {
            const response = await apiClient.patch(`/users/${id}`, profileData);
            dispatch(updateAdmin(response.data));
            toast.dismiss();
            toast.success('Profile Updated');
            setTimeout(() => {
                navigate(-1);
            }, 500);
        } catch (error) {
            toast.dismiss();
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto max-w-lg p-4">
            <form
                className="shadow-md rounded p-6 bg-white"
                onSubmit={handleSubmit}
            >
                <h4 className="text-center text-2xl mb-4">Edit Profile</h4>
                <div className="flex items-center mb-4">
                    <h4 className="font-bold">Email:</h4>
                    <h4 className="ml-2">{profileData.email}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block font-bold mb-1">Name:</label>
                        <input
                            type="text"
                            className="form-input border rounded w-full"
                            id="name"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block font-bold mb-1">Phone:</label>
                        <input
                            id="phone"
                            type="number"
                            className="form-input border rounded w-full"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="house" className="block font-bold mb-1">House:</label>
                        <input
                            type="text"
                            className="form-input border rounded w-full"
                            id="house"
                            name="house"
                            value={profileData.house}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="street" className="block font-bold mb-1">Street:</label>
                        <input
                            type="text"
                            className="form-input border rounded w-full"
                            id="street"
                            name="street"
                            value={profileData.street}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block font-bold mb-1">State:</label>
                        <input
                            type="text"
                            className="form-input border rounded w-full"
                            id="state"
                            name="state"
                            value={profileData.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="country" className="block font-bold mb-1">Country:</label>
                        <input
                            type="text"
                            className="form-input border rounded w-full"
                            id="country"
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-bold mb-1">Change Image:</label>
                        <input
                            type="file"
                            className="form-input border rounded w-full"
                            id="image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <img className="h-24 w-24 rounded-full object-cover" src={profileData.image || ""} alt="" />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <button type="submit" className="btn bg-blue-500 text-white rounded px-4 py-2">
                        Update Profile
                    </button>
                    <button
                        type="button"
                        className="btn bg-red-500 text-white rounded px-4 py-2"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
