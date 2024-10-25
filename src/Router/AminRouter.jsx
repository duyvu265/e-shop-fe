import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loadding from '../components/Loadding'
import Dashboard from './../components/Pages/admin/AdminComponnent/Dashboard';
import Banners from './../components/Pages/admin/AdminComponnent/Banners';
import BannerAdd from './../components/Pages/admin/AdminComponnent/BannerAdd';
import Category from './../components/Pages/admin/AdminComponnent/Category';
import CategoryAdd from './../components/Pages/admin/AdminComponnent/CategoryAdd';
import Coupon from './../components/Pages/admin/AdminComponnent/Coupon';
import Products from './../components/Pages/admin/AdminComponnent/Products';
import ProductAdd from './../components/Pages/admin/AdminComponnent/ProductAdd';
import ProductView from './../components/Pages/admin/AdminComponnent/ProductView';
import ProductEdit from './../components/Pages/admin/AdminComponnent/ProductEdit';
import Orders from './../components/Pages/admin/AdminComponnent/Orders';
import OrderView from './../components/Pages/admin/AdminComponnent/OrderView';
import Users from './../components/Pages/admin/AdminComponnent/Users';
import UserAdd from './../components/Pages/admin/AdminComponnent/UserAdd';
import UserEdit from './../components/Pages/admin/AdminComponnent/UserEdit';
import UserProfile from './../components/Pages/admin/AdminComponnent/UserProfile';
import Customers from './../components/Pages/admin/AdminComponnent/Customers';
import CustomerProfile from './../components/Pages/admin/AdminComponnent/CustomerProfile';
import Profile from './../components/Pages/admin/AdminComponnent/Profile';
import ProfileEdit from './../components/Pages/admin/AdminComponnent/ProfileEdit';
import AdminLayout from './../Layout/Admin/AdminLayout';
import Login from './../components/Pages/admin/AdminComponnent/Login';
import ProtectedAdminRoutes from './Midleware';


const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route element={<AdminLayout />} >
          <Route element={<ProtectedAdminRoutes />} >
            <Route path='/' element={<Navigate to={'/admin/dashboard'} />} />
            <Route path='/dashboard' element={<Dashboard />} />
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
          </Route> */}

        {/* </Route> */}
      </Routes>
    </>
  )
}

export default AdminRoutes