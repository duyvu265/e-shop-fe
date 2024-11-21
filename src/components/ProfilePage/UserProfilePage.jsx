import { useState, useEffect } from "react";
import { FiEdit2, FiHeart, FiShoppingCart, FiTruck, FiMapPin } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import apiClient from "../../services/apiClient";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedSection, setExpandedSection] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [orders, setOrders] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const { isLoggedIn, userInfo } = useSelector(state => state.user);
  console.log("profileData",profileData);
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const profileResponse = await apiClient.get(`/user/profile/${userInfo.id}`);
        const settingsResponse = await apiClient.get(`/user/settings/${userInfo.id}`);
        setProfileData(profileResponse.data);
        setSettings(settingsResponse.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const ordersResponse = await apiClient.get(`/user/orders/${userInfo.id}`);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const wishlistResponse = await apiClient.get(`/user/wishlist/${userInfo.id}`);
        setWishlist(wishlistResponse.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
    fetchOrders();
    fetchWishlist();
  }, [userInfo?.id]);

  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSettingChange = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put("/api/profile", profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const renderTabContent = () => {
    if (!profileData || !orders || !wishlist || !settings) {
      return <div>Loading data...</div>;
    }

    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200";
                  }}
                />
                <button
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                  aria-label="Edit Profile Picture"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-gray-600">{profileData.phone}</p>
                <div className="mt-2 flex items-start gap-2">
                  <FiMapPin className="text-gray-500 mt-1" />
                  <p className="text-gray-600">{profileData.address}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading && <BiLoaderAlt className="animate-spin mr-2" />}
                Save Changes
              </button>
            </form>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Order {order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiTruck className="text-gray-500" />
                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 py-4 border-t">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-900 font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4 flex justify-between items-center">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg font-bold">{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "wishlist":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4 flex space-x-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-900 font-bold mt-2">{item.price}</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                      <FiHeart className="mr-2" />
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <button
            className={`text-lg ${activeTab === "profile" ? "font-semibold" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`text-lg ${activeTab === "orders" ? "font-semibold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`text-lg ${activeTab === "wishlist" ? "font-semibold" : ""}`}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </button>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
