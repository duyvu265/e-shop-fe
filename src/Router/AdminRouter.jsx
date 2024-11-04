import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../Layout/Admin/AdminLayout';
import ProtectedAdminRoutes from './Middleware';
import Loadding from '../components/Loadding';

const Login = lazy(() => import('../components/Pages/admin/AdminComponnent/Login'));
const Banners = lazy(() => import('../components/Pages/admin/AdminComponnent/Banners'));
const BannerAdd = lazy(() => import('../components/Pages/admin/AdminComponnent/BannerAdd'));
const Category = lazy(() => import('../components/Pages/admin/AdminComponnent/Category'));
const CategoryAdd = lazy(() => import('../components/Pages/admin/AdminComponnent/CategoryAdd'));
const Coupon = lazy(() => import('../components/Pages/admin/AdminComponnent/Coupon'));
const Products = lazy(() => import('../components/Pages/admin/AdminComponnent/Products'));
const ProductAdd = lazy(() => import('../components/Pages/admin/AdminComponnent/ProductAdd'));
const ProductView = lazy(() => import('../components/Pages/admin/AdminComponnent/ProductView'));
const ProductEdit = lazy(() => import('../components/Pages/admin/AdminComponnent/ProductEdit'));
const Orders = lazy(() => import('../components/Pages/admin/AdminComponnent/Orders'));
const OrderView = lazy(() => import('../components/Pages/admin/AdminComponnent/OrderView'));
const Users = lazy(() => import('../components/Pages/admin/AdminComponnent/Users'));
const UserAdd = lazy(() => import('../components/Pages/admin/AdminComponnent/UserAdd'));
const UserProfile = lazy(() => import('../components/Pages/admin/AdminComponnent/UserProfile'));
const UserEdit = lazy(() => import('../components/Pages/admin/AdminComponnent/UserEdit'));
const Customers = lazy(() => import('../components/Pages/admin/AdminComponnent/Customers'));
const CustomerProfile = lazy(() => import('../components/Pages/admin/AdminComponnent/CustomerProfile'));
const Profile = lazy(() => import('../components/Pages/admin/AdminComponnent/Profile'));
const ProfileEdit = lazy(() => import('../components/Pages/admin/AdminComponnent/ProfileEdit'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<Loadding />}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route element={<ProtectedAdminRoutes />}>
            <Route path='/' element={<Navigate to='/admin/products' />} />
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path='/banners' element={<Banners />} />
            <Route path='/banner/add' element={<BannerAdd />} />
            <Route path='/category' element={<Category />} />
            <Route path='/category/add' element={<CategoryAdd />} />
            <Route path='/coupon' element={<Coupon />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/add' element={<ProductAdd />} />
            <Route path='/products/:id' element={<ProductView />} />
            <Route path='/products/:id/edit' element={<ProductEdit />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/:id' element={<OrderView />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/add' element={<UserAdd />} />
            <Route path='/users/:id' element={<UserProfile />} />
            <Route path='/users/:id/edit' element={<UserEdit />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/:id' element={<CustomerProfile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/edit' element={<ProfileEdit />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
