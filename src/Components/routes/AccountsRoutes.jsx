import { Outlet, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AccountsProvider from "../context/AccountsContext";
import AccountsLayout from "../../Accounts/layout/AccountsLayout";
import AccountsDashboard from "../../Accounts/pages/AccountsDashboard";
import AccountsTotalPendingPayments from "../../Accounts/pages/TotalPendingPayments";
import AccountsTotalVerifiedPayment from "../../Accounts/pages/TotalVerifiedPayment";
import AccountsTotalRejetedPayment from "../../Accounts/pages/TotalRejectedPayment";
import AccountsChallanPending from "../../Accounts/pages/ChallanPending";

const AccountsRoutes = () => (
  // <Route element={<ProtectedRoute type="accounts" />}>
  <Route
    element={
      <AccountsProvider>
        <AccountsLayout>
          <Outlet />
        </AccountsLayout>
      </AccountsProvider>
    }
  >
    <Route path="/accounts-dashboard" element={<AccountsDashboard />} />
    <Route path="/accounts-total-pending-payment" element={<AccountsTotalPendingPayments />} />
    <Route path="/accounts-total-verified-payment" element={<AccountsTotalVerifiedPayment />} />
    <Route path="/accounts-total-rejected-payment" element={<AccountsTotalRejetedPayment />} />
    <Route path="/accounts-challan-pending" element={<AccountsChallanPending />} />


  </Route>
  // </Route>
);

export default AccountsRoutes;
