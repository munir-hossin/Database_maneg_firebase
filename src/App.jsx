import { Route, Routes } from "react-router";
import DashboardLayout from "./layout/DashboardLayout";
import Error from "./Error";

import HomeDashboard from "./pages/dashboard/home/Index";
import CreateCategory from "./pages/dashboard/category/Index";
import CreateProduct from "./pages/dashboard/product/Index";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<DashboardLayout />}>
                <Route index element={<HomeDashboard />} />
                <Route path="create-category" element={<CreateCategory />} />
                <Route path="edit-category/:id" element={<CreateCategory />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="edit-product/:id" element={<CreateProduct />} />

                {/* Error Route */}
                <Route path="/*" element={<Error />} />
            </Route>
        </Routes>
    );
}
