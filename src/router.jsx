import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/Pages/HomePage';
import ListPages from './components/Pages/ListPages';
import LoginPage from './components/Pages/Auth/LoginPage';
import RegisterPage from './components/Pages/Auth/RegisterPage';
import ForgetPasswordPage from './components/Pages/Auth/ForgetPasswordPage';
import Dashboard from './components/Pages/admin/Dashboard';
import OrderPage from './components/Pages/OrderPage/OrderPage';
import ProfilePage from './components/Pages/ProfilePage/ProfilePage';
import ProductPage from './components/Pages/Product/ProductPage';

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route element={<AppRouter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/" element={<ListPages />} />
        <Route path="/orderPage/:id" element={<OrderPage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
