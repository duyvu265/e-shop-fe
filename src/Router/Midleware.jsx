import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import usersSlice from '../features/Admin/usersSlice';

const ProtectedAdminRoutes = () => {

  const { isLogedIn } = useSelector(state => state.adminAuth)
  const { products, error } = useSelector((state) => state.products);

  if (!isLogedIn) {
    <Navigate to={'/admin/login'} />
    return null
  } else if (isLogedIn) {
    return <Outlet />
  } else if (isLogedIn === false) {
    return <Navigate to={'/admin/login'} />
  }

}

export default ProtectedAdminRoutes