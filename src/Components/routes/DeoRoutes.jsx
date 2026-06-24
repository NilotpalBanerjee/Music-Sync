import { Outlet, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DeoProvider from "../context/DeoContext";
import DeoLayout from "../../DEO/layout/DeoLayout";
import DeoDashboard from "../../DEO/pages/DeoDashboard";
import DeoListOfSchool from "../../DEO/pages/ListOfSchool"
import DeoTotalApplicants from "../../DEO/pages/TotalApplicants"

const DeoRoutes = () => (
  // <Route element={<ProtectedRoute type="deo" />}>
  <Route
    element={
      <DeoProvider>
        <DeoLayout>
          <Outlet />
        </DeoLayout>
      </DeoProvider>
    }
  >
    <Route path="/deo-dashboard" element={<DeoDashboard />} />
    <Route path="/deo-pending-school-list" element={<DeoListOfSchool status="Pending" />} />
    <Route path="/deo-approved-school-list" element={<DeoListOfSchool status="Approved" />} />
    <Route path="/deo-rejected-school-list" element={<DeoListOfSchool status="Rejected" />} />
    <Route path="/deo-total-school-list" element={<DeoListOfSchool status="Total" />} />

    <Route path="/deo-total-pending-applicants" element={<DeoTotalApplicants status="Pending" />} />
    <Route path="/deo-total-approved-applicants" element={<DeoTotalApplicants status="Approved" />} />
    <Route path="/deo-total-rejected-applicants" element={<DeoTotalApplicants status="Rejected" />} />
    <Route path="/deo-total-applicants" element={<DeoTotalApplicants status="Total" />} />


  </Route>
  // </Route>
);

export default DeoRoutes;
