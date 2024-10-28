import { Route, Routes } from 'react-router-dom'
import AppRouter from './Router/UserRouter';
import AdminRoutes from './Router/AdminRouter';
const App = () => {


  return (
    <Routes>
      <Route path='/*' element={<AppRouter />} />
      <Route path='/admin/*' element={<AdminRoutes />} />
    </Routes>
  );
};

export default App;


