import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoutes = () => {
  const { isLogedIn } = useSelector(state => state.adminAuth);
  if (isLogedIn === undefined) {

    return null; 
  }

  if (!isLogedIn) {
    return <Navigate to={'/admin/login'} />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoutes;
