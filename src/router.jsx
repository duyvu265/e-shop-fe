import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/Pages/HomePage';
import ListPages from './components/Pages/ListPages';
import LoginPage from './components/Pages/Auth/LoginPage';
import RegisterPage from './components/Pages/Auth/RegisterPage';
import ForgetPasswordPage from './components/Pages/Auth/ForgetPasswordPage';


const AppRouter = () => {
  return (
    <>
      <Navbar />  
      <Outlet /> 
      <Footer /> 
    </>
  );
}

const App = () => {
  return (
    <Routes>
      <Route element={<AppRouter />}>  
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPages />} />
      </Route>   
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
    </Routes>
  );
};

export default App;
