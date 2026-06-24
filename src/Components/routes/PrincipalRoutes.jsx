import { Outlet, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PrincipalProvider from "../context/PrincipalContext";
import PrincipalLayout from "../../Principal/layout/PrincipalLayout";
import PrincipalDashboard from "../../Principal/pages/Dashboard";
import PrincipalAddStident from "../../Principal/pages/AddStudent"
import PrincipalStudentChecklist from "../../Principal/pages/StudentChecklist";
import PrincipalUploadDocument from "../../Principal/pages/UploadDocument";
import PrincipalDeoSubmission from "../../Principal/pages/DeoSubmission";
import PrincipalDeoStatusPending from "../../Principal/pages/DeoStatus";
import PrincipalDeoStatusApproved from "../../Principal/pages/DeoStatus";
import PrincipalDeoStatusRejected from "../../Principal/pages/DeoStatus";
import PrincipalGenerateChallan from "../../Principal/pages/GenerateChallan";
import PrincipalChallanStatus from "../../Principal/pages/ChallanStatus";
import PrincipalListOfExaminees from '../../Principal/pages/ListOfExaminees';

const PrincipalRoutes = () => (
    // <Route element={<ProtectedRoute type="principal" />}>
    <Route
        element={
            <PrincipalProvider>
                <PrincipalLayout>
                    <Outlet />
                </PrincipalLayout>
            </PrincipalProvider>
        }
    >
        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="/principal-add-student" element={<PrincipalAddStident />} />
        <Route path="/principal-students-checklist" element={<PrincipalStudentChecklist />} />
        <Route path="/principal-upload-document" element={<PrincipalUploadDocument />} />
        <Route path="/principal-deo-submission" element={<PrincipalDeoSubmission />} />
        <Route
            path="/principal-deo-status-pending"
            element={<PrincipalDeoStatusPending status="Pending" />}
        />

        <Route
            path="/principal-deo-status-approved"
            element={<PrincipalDeoStatusApproved status="Approved" />}
        />

        <Route
            path="/principal-deo-status-rejected"
            element={<PrincipalDeoStatusRejected status="Rejected" />}
        />

        <Route path="/principal-generate-challan" element={<PrincipalGenerateChallan />} />
        <Route path="/principal-challan-status" element={<PrincipalChallanStatus />} />
        <Route path="/principal-List-of-examinees" element={<PrincipalListOfExaminees />} />

    </Route>
    // </Route>
)

export default PrincipalRoutes;
