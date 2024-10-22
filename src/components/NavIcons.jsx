import profileIcon from '../assets/profile.png';
import notificationIcon from '../assets/notification.png';
import cartIcon from '../assets/cart.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setCart, setNotifications } from '../features/user/userSlice/UserSlice';
import { useNavigate } from 'react-router-dom';
import CartModal from './NavbarIcon/CartModal';
import Notifications from './NavbarIcon/Notification';
import apiClient from '../services/apiClient';

function NavIcons() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { isLoggedIn, userInfo } = useSelector(state => state.user);
  const { cart, notifications } = useSelector(state => state.user);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [loadingCarts, setLoadingCarts] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient.get('/notifications/');
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    };

    const fetchCarts = async () => {
      try {
        const response = await apiClient.get('/cart/get/');
        dispatch(setCart(response.data));
        console.log("cart fetched", response.data);

      } catch (error) {
        console.error("Error fetching Cart:", error);
      } finally {
        setLoadingCarts(false);
      }
    };

    if (isLoggedIn) {
      fetchNotifications();
      fetchCarts();
    }
  }, [isLoggedIn, dispatch]);

  const toggleProfileMenu = () => {
    if (isLoggedIn) {
      setProfileOpen(!isProfileOpen);
      setCartOpen(false);
      setNotificationOpen(false);
    } else {
      navigate("/login");
    }
  };

  const toggleCartMenu = () => {
    if (isLoggedIn) {
      setCartOpen(!isCartOpen);
      setProfileOpen(false);
      setNotificationOpen(false);
    } else {
      navigate("/login");
    }
  };

  const toggleNotificationMenu = () => {
    if (isLoggedIn) {
      setNotificationOpen(!isNotificationOpen);
      setProfileOpen(false);
      setCartOpen(false);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
  };
  console.log("Cart products:", cart.products);
  console.log("Total quantity:", cart?.products?.reduce((acc, item) => acc + (item?.quantity || 0), 0));


  return (
    <div className="flex items-center gap-4 xl:gap-6">
      <div className="relative z-20">
        <img
          src={profileIcon}
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleProfileMenu}
        />
        {isProfileOpen && (
          <div className="absolute bg-white shadow-lg p-2">
            <p>Xin chào, {userInfo?.username}</p>
            <a href="/profilePage" className="text-blue-500 hover:underline">Xem hồ sơ</a>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>

      <div className="relative">
        <img
          src={notificationIcon}
          alt="Notifications"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleNotificationMenu}
        />
        {notifications.length > 0 && isLoggedIn && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {notifications.length}
          </div>
        )}
        {isNotificationOpen && (
          <Notifications notifications={notifications} loading={loadingNotifications} />
        )}
      </div>

      {/* Cart */}
      <div className="relative">
        <img
          src={cartIcon}
          alt="Cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleCartMenu}
        />
        {cart?.products?.length > 0 && isLoggedIn && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {cart?.products?.reduce((acc, item) => acc + item?.quantity, 0) || 0}
          </div>
        )}


        {isCartOpen && (
          <CartModal lineItems={cart || {}} loading={loadingCarts} />
        )}
      </div>
    </div>
  );

}

export default NavIcons;
