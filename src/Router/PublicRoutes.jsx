import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const { isLogedIn } = useSelector(state => state?.adminAuth);

  return isLogedIn ? <Navigate to='/admin/products' /> : <Outlet />;
};

export default PublicRoutes;
