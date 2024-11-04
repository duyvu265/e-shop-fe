import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoutes = () => {
  const { isLogedIn ,adminData} = useSelector(state => state?.adminAuth);  
  if (isLogedIn === undefined) {
    return null;
  }
  return isLogedIn && (adminData?.user_type === 'admin' || adminData?.user_type === 'staff') 
    ? <Outlet /> 
    : <Navigate to='/admin/login' />;
};

export default ProtectedAdminRoutes;
