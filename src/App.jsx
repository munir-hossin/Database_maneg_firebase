import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import HomeDashboard from "./pages/HomeDashboard";
import CreateProduct from "./pages/CreateProduct";
import CreateCategory from "./pages/CreateCategory";
import Error from "./Error";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-category/:id" element={<CreateCategory />} />
          <Route path="create-category" element={<CreateCategory />} />

          {/* Error Route */}
           <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;