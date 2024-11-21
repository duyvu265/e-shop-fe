import { useState, useEffect } from 'react';

import format from '../../../format';
import UpdateButton from '../../UpdateButton';

const mockUserData = {
  contactId: '12345',
  profile: {
    nickname: 'john_doe',
  },
  contact: {
    firstName: 'John',
    lastName: 'Doe',
    phones: ['+123456789'],
  },
  loginEmail: 'john.doe@example.com',
};

const mockOrderData = [
  {
    _id: 'order_001',
    priceSummary: {
      subtotal: {
        amount: '100.00',
      },
    },
    _createdDate: new Date(),
    status: 'Shipped',
  },
  {
    _id: 'order_002',
    priceSummary: {
      subtotal: {
        amount: '250.00',
      },
    },
    _createdDate: new Date(),
    status: 'Processing',
  },
];

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUser(mockUserData);
      setOrders(mockOrderData);
    }, 1000);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.contactId} />
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder={user.profile?.nickname || 'john_doe'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={user.contact?.firstName || 'John'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="lastName"
            placeholder={user.contact?.lastName || 'Doe'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={user.contact?.phones[0] || '+123456789'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user.loginEmail || 'john.doe@example.com'}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id.substring(0, 10)}...</span>
              <span className="w-1/4">${order.priceSummary?.subtotal?.amount}</span>
              <span className="w-1/4">{format(order._createdDate)}</span>
              <span className="w-1/4">{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
