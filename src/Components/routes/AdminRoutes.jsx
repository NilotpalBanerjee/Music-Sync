import { Outlet, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminProvider from "../context/AdminContext";
import AdminLayout from "../../Admin/layout/AdminLayout";
import AdminDashboard from "../../Admin/pages/AdminDashboard";
import AdminNotice from "../../Admin/pages/AdminNotice"
import AdminTickerMaster from "../../Admin/pages/AdminTickerMaster"
import AdminSchoolList from "../../Admin/pages/AdminSchoolList";
import AdminEditSchool from "../../Admin/pages/AdminEditSchool"

const AdminRoutes = () => (
  // <Route element={<ProtectedRoute type="admin" />}>
  <Route
    element={
      <AdminProvider>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </AdminProvider>
    }
  >
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    <Route path="/admin-notice" element={<AdminNotice />} />
    <Route path="/admin-ticker-master" element={<AdminTickerMaster />} />
    <Route path="/admin-school-list" element={<AdminSchoolList />} />
    <Route path="/admin-edit-school" element={<AdminEditSchool />} />


  </Route>
  // </Route>
);

export default AdminRoutes;
