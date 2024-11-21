// AdminRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import ProtectedAdminRoutes from "./Middleware";
import Login from '../components/admin/AdminComponnent/Login';
import Dashboard from './../components/admin/AdminComponnent/Dashboard';
import Banners from './../components/admin/AdminComponnent/Banners';
import Category from './../components/admin/AdminComponnent/Category';
import Coupon from './../components/admin/AdminComponnent/Coupon';
import Products from './../components/admin/AdminComponnent/Products';
import ProductAddPage from './../components/admin/AdminComponnent/ProductAdd';
import Orders from './../components/admin/AdminComponnent/Orders';
import UserManagement from './../components/admin/AdminComponnent/UserManagement';
import Customers from './../components/admin/AdminComponnent/Customers';
import Profile from './../components/admin/AdminComponnent/Profile';



const AdminRouter = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedAdminRoutes />}>
        <Route element={<AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/banners" element={<Banners />} />
          <Route path="/category" element={<Category />} />
          <Route path="/coupon" element={<Coupon />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/add" element={<ProductAddPage />} />
          <Route path="/products/product-items" element={<ProductAddPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRouter;
