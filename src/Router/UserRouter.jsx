// UserRouter.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../components/Pages/HomePage";
import ListPages from "../components/Pages/ListPages";
import ForgetPasswordPage from "../components/Auth/ForgetPasswordPage";
// import ProfilePage from "../components/Pages/ProfilePage/ProfilePage";

import LoginPage from './../components/Auth/LoginPage';
import OrderHistory from './../components/OrderPage/OrderHistory';
import OrderDetails from './../components/OrderPage/OrderDetails';
import ProfilePage from './../components/ProfilePage/UserProfilePage';
import ProductPage from './../components/Product/ProductPage';
import NewProducts from "../components/NewProducts";
import CheckoutPage from './../components/CheckOut/CheckOut';
import SignUpPage from "../components/Auth/SignUpPage";
import ContractPage from './../components/Contract/ContractPage';
import HelpCenter from './../components/HelpCenter/HelpCenter';
import PrivacyPolicy from './../components/PrivacyPolicy/PrivacyPolicy';


const AppCustom = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<AppCustom/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPages />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/new-products" element={<NewProducts />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/contract-page" element={<ContractPage />} />
      <Route path="/Help-Center" element={<HelpCenter />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default UserRouter;
