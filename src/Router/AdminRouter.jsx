// AdminRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Banners from "../components/Pages/admin/AdminComponnent/Banners";
import Category from "../components/Pages/admin/AdminComponnent/Category";
import Coupon from "../components/Pages/admin/AdminComponnent/Coupon";
import Products from "../components/Pages/admin/AdminComponnent/Products";
import Orders from "../components/Pages/admin/AdminComponnent/Orders";
import Customers from "../components/Pages/admin/AdminComponnent/Customers";
import Profile from "../components/Pages/admin/AdminComponnent/Profile";
import Login from "../components/Pages/admin/AdminComponnent/Login";
import AdminLayout from "../Layout/Admin/AdminLayout";
import Dashboard from "../components/Pages/admin/AdminComponnent/Dashboard";
import ProtectedAdminRoutes from './Middleware';
import ProductAddPage from "../components/Pages/admin/AdminComponnent/ProductAdd";
import UserManagement from "../components/Pages/admin/AdminComponnent/UserManagement";


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
          <Route path="/products" element={<Products />} />
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
