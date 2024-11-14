
import { Route, Routes } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import AdminRouter from "./Router/AdminRouter";
import ProductDetail from "./demo/demoadd";
// import ProductCreationStepper from './demo/demoadd';


const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      {/* <Route path="/admin/*" element={<ProductDetail />} /> */}
      {/* <Route path="/admin/*" element={<ProductCreationStepper />} /> */}
    </Routes>
  );
};

export default App;
