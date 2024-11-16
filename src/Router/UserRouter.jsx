// UserRouter.jsx
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "../components/Pages/HomePage";
import ListPages from "../components/Pages/ListPages";
import LoginPage from "../components/Pages/Auth/LoginPage";
import ForgetPasswordPage from "../components/Pages/Auth/ForgetPasswordPage";
import ProfilePage from "../components/Pages/ProfilePage/ProfilePage";
import ProductPage from "../components/Pages/Product/ProductPage";
import OrderHistory from "../components/Pages/OrderPage/OrderHistory";
import OrderDetails from "../components/Pages/OrderPage/OrderDetails";
import SignUpPage from "../components/Pages/Auth/SignUpPage";
import ContractPage from "../components/Pages/Contract/ContractPage";
import HelpCenter from "../components/Pages/HelpCenter/HelpCenter";
import PrivacyPolicy from "../components/Pages/PrivacyPolicy/PrivacyPolicy";
import CheckoutPage from "../components/Pages/CheckOut/CheckOut";
import NewProducts from "../components/NewProducts";


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
