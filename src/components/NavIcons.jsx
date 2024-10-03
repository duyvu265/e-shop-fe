import profileIcon from '../assets/profile.png';
import notificationIcon from '../assets/notification.png';
import cartIcon from '../assets/cart.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice/UserSlice';
import { useNavigate } from 'react-router-dom';
import CartModal from './NavbarIcon/CartModal';
import Notifications from './NavbarIcon/Notification';

const fakeCartData = {
  lineItems: [
    {
      _id: '1',
      productName: { original: 'Product 1' },
      quantity: 2,
      price: { amount: 29.99 },
      availability: { status: 'In Stock' },
      image: '/path/to/image1.jpg',
    },
    {
      _id: '2',
      productName: { original: 'Product 2' },
      quantity: 1,
      price: { amount: 59.99 },
      availability: { status: 'In Stock' },
      image: '/path/to/image2.jpg',
    },
    {
      _id: '3',
      productName: { original: 'Product 3' },
      quantity: 3,
      price: { amount: 19.99 },
      availability: { status: 'Out of Stock' },
      image: '/path/to/image3.jpg',
    },
  ],
  subtotal: { amount: 109.97 },
};

const fakeNotifications = [
  {
    id: 1,
    message: 'Bạn đã nhận được một tin nhắn mới.',
    timestamp: '2024-10-03T12:00:00Z',
  },
  {
    id: 2,
    message: 'Sản phẩm bạn quan tâm đã có hàng.',
    timestamp: '2024-10-03T13:00:00Z',
  },
  {
    id: 3,
    message: 'Bạn có một lời mời kết bạn mới.',
    timestamp: '2024-10-03T14:00:00Z',
  },
];

function NavIcons() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector(state => state.user);
  const cart = fakeCartData;

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

  return (
    <div className="flex items-center gap-4 xl:gap-6">
      {/* Profile */}
      <div className="relative">
        <img
          src={profileIcon}
          alt="Profile"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleProfileMenu}
        />
        {isProfileOpen && (
          <div className="absolute bg-white shadow-lg p-2 ">
            <p>Xin chào, {userInfo?.name}</p>
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <img
          src={notificationIcon}
          alt="Notifications"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={toggleNotificationMenu}
        />
        {fakeNotifications.length > 0 && isLoggedIn && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {fakeNotifications.length ? fakeNotifications.length : ''}
          </div>
        )}
        {isNotificationOpen && (
          <Notifications fakeNotifications={fakeNotifications} />
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
        {cart.length > 0 && isLoggedIn && (
          <div className='absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center'>
            {cart.lineItems.length ? cart.lineItems.length : ''}
          </div>
        )}
        {isCartOpen && (
          <CartModal lineItems={fakeCartData.lineItems} />
        )}
      </div>
    </div>
  );
}

export default NavIcons;
