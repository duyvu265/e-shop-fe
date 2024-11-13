import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoutes = () => {
  const { isLogedIn, adminData } = useSelector(state => state?.adminAuth);   
  if (isLogedIn === undefined) {
    return null; 
  }
  if (!isLogedIn) {
    return <Navigate to="/login" />;
  }
  if (isLogedIn && (adminData?.user_type === 'admin' || adminData?.user_type === 'staff')) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedAdminRoutes;
