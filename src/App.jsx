
import { Route, Routes } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import AdminRouter from "./Router/AdminRouter";


const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default App;
