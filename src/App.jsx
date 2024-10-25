import { Route, Routes } from 'react-router-dom'
import AppRouter from './Router/router';
import AdminRoutes from './Router/AminRouter';
const App = () => {


  return (   
        <Routes>
            <Route path='/*' element={<AppRouter />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
  );
};

export default App;


