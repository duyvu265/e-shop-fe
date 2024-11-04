import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../components/Pages/HomePage';
import ListPages from '../components/Pages/ListPages';
import LoginPage from '../components/Pages/Auth/LoginPage';
import RegisterPage from '../components/Pages/Auth/RegisterPage';
import ForgetPasswordPage from '../components/Pages/Auth/ForgetPasswordPage';
import OrderPage from '../components/Pages/OrderPage/OrderPage';
import ProfilePage from '../components/Pages/ProfilePage/ProfilePage';
import ProductPage from '../components/Pages/Product/ProductPage';

const AppCustom = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const UserRouter = () => {
  
  return (
    <Routes>
      <Route element={<AppCustom />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/" element={<ListPages />} />
        <Route path="/orderPage/:id" element={<OrderPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
    </Routes>
  );
};

export default UserRouter;
