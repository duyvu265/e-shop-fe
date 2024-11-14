import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice/UserSlice';
import { useNavigate } from 'react-router-dom';
import CartModal from './NavbarIcon/CartModal';
import Notifications from './NavbarIcon/Notification';
import profileIcon from '../assets/profile.png';
import notificationIcon from '../assets/notification.png';
import cartIcon from '../assets/cart.png';
// import orderHistoryIcon from '../assets/order-history.png'; 

function NavIcons() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { isLoggedIn, userInfo, cart, notifications } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate("/login");
  };

  const handleOrderHistoryClick = () => {
    if (isLoggedIn) {
      navigate("/order-history"); 
    } else {
      navigate("/login");
    }
  };

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
          <Notifications notifications={notifications} />
        )}
      </div>

      <div className="relative">
        <img
          src={cartIcon}
          alt="Cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleCartMenu}
        />
        {cart?.length > 0 && isLoggedIn && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {cart?.length}
          </div>
        )}
        {isCartOpen && (
          <CartModal lineItems={cart || {}} />
        )}
      </div>
      {/* <div className="relative">
        <img
          src={orderHistoryIcon} 
          alt="Order History"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleOrderHistoryClick} 
        />
      </div> */}
    </div>
  );
}

export default NavIcons;
